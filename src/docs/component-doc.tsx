import { Children, useEffect, useState, useSyncExternalStore } from "react"
import { Link } from "@tanstack/react-router"
import { CheckIcon, XIcon } from "lucide-react"

import { CodeBlock } from "./code-block"
import { Section } from "./page"
import { Badge } from "@/components/ui/badge"

// Component sources, read to derive metadata that can't go stale.
const uiSources = import.meta.glob<string>("../components/ui/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
})

/**
 * Reads the variant props out of each `const fooVariants = cva(base, { variants, defaultVariants })`
 * in a component file: option names per variant and their defaults. A small
 * scanner rather than a regex, because option keys can be quoted ("icon-xs").
 */
export function parseVariants(src: string) {
  const results: { part: string; props: { name: string; options: string[]; defaultValue?: string }[] }[] = []
  for (const m of src.matchAll(/const (\w+)Variants = cva\(/g)) {
    const part = m[1].charAt(0).toUpperCase() + m[1].slice(1)
    const start = src.indexOf("variants:", m.index)
    if (start < 0) continue
    // Walk the `variants: { ... }` object, collecting keys at depth 1 (variant
    // names) and depth 2 (their options), skipping string contents.
    let i = src.indexOf("{", start)
    let depth = 0
    let current: { name: string; options: string[]; defaultValue?: string } | undefined
    const props: { name: string; options: string[]; defaultValue?: string }[] = []
    for (; i < src.length; i++) {
      const c = src[i]
      if (c === '"' || c === "'" || c === "`") {
        const end = src.indexOf(c, i + 1)
        // A quoted key at depth 2 is an option name.
        if (depth === 2 && /^\s*:/.test(src.slice(end + 1, end + 4)) && current) current.options.push(src.slice(i + 1, end))
        i = end
        continue
      }
      if (c === "{") depth++
      else if (c === "}") {
        depth--
        if (depth === 0) break
      } else if (/[A-Za-z_]/.test(c) && /[\s{,]/.test(src[i - 1])) {
        const key = /^[A-Za-z_][\w-]*/.exec(src.slice(i))![0]
        const after = src.slice(i + key.length).trimStart()
        if (after.startsWith(":")) {
          if (depth === 1) props.push((current = { name: key, options: [] }))
          else if (depth === 2 && current) current.options.push(key)
        }
        i += key.length - 1
      }
    }
    const defaults = /defaultVariants:\s*\{([^}]*)\}/.exec(src.slice(m.index))?.[1] ?? ""
    for (const d of defaults.matchAll(/([\w-]+):\s*"([^"]+)"/g)) {
      const prop = props.find((p) => p.name === d[1])
      if (prop) prop.defaultValue = d[2]
    }
    if (props.length) results.push({ part, props })
  }
  return results
}

const titleCase = (s: string) => s.replace(/(^|-)(\w)/g, (_, dash, c) => (dash ? " " : "") + c.toUpperCase())

export function analyze(slug: string) {
  const src = uiSources[`../components/ui/${slug}.tsx`] ?? ""
  const exportBlock = /export\s*\{([^}]*)\}/.exec(src)?.[1] ?? ""
  const parts = exportBlock
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s && /^[A-Z]/.test(s))
  const primitives = [...new Set([...src.matchAll(/@base-ui\/react\/([a-z-]+)/g)].map((m) => m[1]))]
    .filter((p) => !["merge-props", "use-render"].includes(p))
    .map((p) => `Base UI · ${titleCase(p)}`)
  // Root imports: import { Combobox as ComboboxPrimitive } from "@base-ui/react"
  for (const m of src.matchAll(/import\s*\{([^}]*)\}\s*from\s*"@base-ui\/react"/g)) {
    for (const name of m[1].split(",").map((n) => n.trim().split(/\s+as\s+/)[0]).filter(Boolean)) {
      primitives.push(`Base UI · ${name.replace(/([a-z])([A-Z])/g, "$1 $2")}`)
    }
  }
  // Other primitive libraries a component can be built on.
  for (const [pkg, label] of [["cmdk", "cmdk"], ["input-otp", "input-otp"], ["react-day-picker", "react-day-picker"], ["recharts", "Recharts"], ["@tanstack/react-table", "TanStack Table"]] as const) {
    if (new RegExp(`from "${pkg}"`).test(src)) primitives.push(label)
  }
  const materials = [...new Set([...src.matchAll(/material-(raised|solid|recessed|track|latched|knob|tint|highlight|lift|overlay)/g)].map((m) => m[1]))].sort()
  // Base UI components document every prop they pass through.
  const baseUiDocs = [...new Set([...src.matchAll(/@base-ui\/react\/([a-z-]+)/g)].map((m) => m[1]))]
    .filter((p) => !["merge-props", "use-render", "input"].includes(p))
    .map((p) => ({ name: titleCase(p), href: `https://base-ui.com/react/components/${p}` }))
  return { parts, primitives, materials, variants: parseVariants(src), baseUiDocs }
}

export interface PropDoc {
  name: string
  type: string
  default?: string
  description: React.ReactNode
}
export interface ApiPart {
  name: string
  description?: React.ReactNode
  props: PropDoc[]
}

function PropTable({ props }: { props: PropDoc[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-card">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 eyebrow font-normal text-muted-foreground">Prop</th>
            <th className="px-4 py-2 eyebrow font-normal text-muted-foreground">Type</th>
            <th className="hidden px-4 py-2 eyebrow font-normal text-muted-foreground md:table-cell">Default</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name} className="border-b align-top last:border-b-0">
              <td className="px-4 py-2.5">
                <code className="font-mono text-xs font-medium">{p.name}</code>
              </td>
              <td className="px-4 py-2.5">
                <code className="font-mono text-xs break-words text-muted-foreground">{p.type}</code>
                <div className="mt-1 text-muted-foreground">{p.description}</div>
              </td>
              <td className="hidden px-4 py-2.5 md:table-cell">
                {p.default ? <code className="font-mono text-xs">{p.default}</code> : <span className="text-subtle-foreground">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const VARIANT_HINT: Record<string, string> = { variant: "Visual style.", size: "Size of the control." }

export function ComponentDoc({
  slug,
  title,
  description,
  usage,
  api = [],
  children,
}: {
  /** File name in src/components/ui and the registry item name. */
  slug: string
  title: string
  description: React.ReactNode
  /** A minimal usage snippet, shown under the import line. */
  usage?: string
  /** Hand-written props, for anything beyond the variants read from source. */
  api?: ApiPart[]
  children: React.ReactNode
}) {
  const { parts, primitives, materials, variants, baseUiDocs } = analyze(slug)
  const [hero, ...rest] = Children.toArray(children)
  const importLine = parts.length ? `import { ${parts.join(", ")} } from "@/components/ui/${slug}"` : ""
  const variantParts: ApiPart[] = variants.map((v) => ({
    name: v.part,
    props: v.props.map((p) => ({
      name: p.name,
      type: p.options.map((o) => `"${o}"`).join(" | "),
      default: p.defaultValue && `"${p.defaultValue}"`,
      description: VARIANT_HINT[p.name] ?? "",
    })),
  }))
  // Hand-written props for a part come first, then its variants.
  const apiParts = [...api]
  for (const vp of variantParts) {
    const existing = apiParts.find((a) => a.name === vp.name)
    if (existing) existing.props = [...existing.props, ...vp.props.filter((p) => !existing.props.some((e) => e.name === p.name))]
    else apiParts.push(vp)
  }
  const install = `npx shadcn@latest add ${location.origin}/r/${slug}.json`
  return (
    <div className="mx-auto flex w-full max-w-6xl gap-10 px-4 py-10 md:px-8">
      <article id="doc" className="flex min-w-0 flex-1 flex-col gap-12">
        <header className="flex flex-col gap-4">
          <div>
            <div className="mb-2 eyebrow text-muted-foreground">Components</div>
            <h1 className="text-3xl">{title}</h1>
            <p className="mt-2 max-w-prose text-base text-muted-foreground">{description}</p>
          </div>
          {(primitives.length > 0 || materials.length > 0) && (
            <div className="flex flex-wrap items-center gap-1.5">
              {primitives.map((p) => (
                <Badge key={p} variant="outline">
                  {p}
                </Badge>
              ))}
              {materials.map((m) => (
                <Badge key={m} variant="secondary" render={<Link to="/foundations/materials" />}>
                  {m}
                </Badge>
              ))}
            </div>
          )}
          <CodeBlock code={install} lang="bash" />
        </header>
        {hero}
        {(importLine || usage) && (
          <Section title="Usage">
            <CodeBlock code={[importLine, usage].filter(Boolean).join("\n\n")} />
          </Section>
        )}
        {rest}
        {(apiParts.length > 0 || baseUiDocs.length > 0 || parts.length > 0) && (
          <Section title="API reference">
            <div className="flex flex-col gap-6">
              {apiParts.map((part) => (
                <div key={part.name} className="flex flex-col gap-2">
                  <h3 className="font-mono text-sm font-medium">{part.name}</h3>
                  {part.description && <p className="max-w-prose text-muted-foreground">{part.description}</p>}
                  <PropTable props={part.props} />
                </div>
              ))}
              {baseUiDocs.length > 0 && (
                <p className="max-w-prose text-muted-foreground">
                  Parts also accept every prop of the Base UI primitive they wrap:{" "}
                  {baseUiDocs.map((d, i) => (
                    <span key={d.href}>
                      {i > 0 && ", "}
                      <a href={d.href} target="_blank" rel="noreferrer" className="text-primary-subtle-foreground underline underline-offset-4">
                        {d.name}
                      </a>
                    </span>
                  ))}
                  .
                </p>
              )}
              {parts.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h3 className="eyebrow text-muted-foreground">Exports</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {parts.map((p) => (
                      <code key={p} className="rounded-md border bg-card px-1.5 py-0.5 font-mono text-xs">
                        {p}
                      </code>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Section>
        )}
      </article>
      <OnThisPage />
    </div>
  )
}

export function Guidelines({ dos, donts }: { dos: React.ReactNode[]; donts: React.ReactNode[] }) {
  const column = (items: React.ReactNode[], ok: boolean) => (
    <div className="rounded-xl border bg-card p-4">
      <div className={`mb-2 flex items-center gap-1.5 font-medium ${ok ? "text-success-subtle-foreground" : "text-destructive-subtle-foreground"}`}>
        {ok ? <CheckIcon className="size-4" /> : <XIcon className="size-4" />} {ok ? "Do" : "Don't"}
      </div>
      <ul className="grid list-disc gap-1.5 pl-5 text-muted-foreground">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
  return (
    <Section title="Guidelines">
      <div className="grid gap-3 md:grid-cols-2">
        {column(dos, true)}
        {column(donts, false)}
      </div>
    </Section>
  )
}

export function Accessibility({ items }: { items: React.ReactNode[] }) {
  return (
    <Section title="Accessibility">
      <ul className="grid max-w-prose list-disc gap-1.5 pl-5 text-muted-foreground">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </Section>
  )
}

// The page's h2s, read from the rendered DOM as an external store. The snapshot
// is a string so it's stable between renders when nothing changed.
const HEADINGS = "#doc h2[id]"
const SEP = "\u0000"
function subscribeHeadings(onChange: () => void) {
  const doc = document.getElementById("doc")
  if (!doc) return () => {}
  const observer = new MutationObserver(onChange)
  observer.observe(doc, { childList: true, subtree: true, characterData: true })
  return () => observer.disconnect()
}
const headingsSnapshot = () =>
  [...document.querySelectorAll<HTMLElement>(HEADINGS)].map((el) => `${el.id}${SEP}${el.textContent ?? ""}`).join("\n")

/** Sticky section index built from the page's h2s; highlights the one in view. */
function OnThisPage() {
  const snapshot = useSyncExternalStore(subscribeHeadings, headingsSnapshot, () => "")
  const headings = snapshot ? snapshot.split("\n").map((line) => {
    const [id, text] = line.split(SEP)
    return { id, text }
  }) : []
  const [active, setActive] = useState<string>()

  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>(HEADINGS)]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-64px 0px -60% 0px" },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [snapshot])

  if (headings.length < 2) return null
  return (
    <nav aria-label="On this page" className="sticky top-20 hidden h-fit w-44 shrink-0 xl:block">
      <div className="mb-2 eyebrow text-muted-foreground">On this page</div>
      <ul className="grid gap-1 border-l">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`-ml-px block border-l py-0.5 pl-3 transition-colors ${
                active === h.id
                  ? "border-primary-subtle-foreground font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
