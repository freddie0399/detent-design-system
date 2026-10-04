import { useEffect, useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "cn"

import "./code.css"
import { Button } from "@/components/ui/button"

type Lang = "tsx" | "bash"

// Shiki is loaded on first use, with only the grammars we need, and a theme
// whose colours are CSS variables mapped to brand tokens (see code.css).
let highlighter: Promise<import("shiki/core").HighlighterCore> | undefined
function getHighlighter() {
  highlighter ??= (async () => {
    const [{ createHighlighterCore, createCssVariablesTheme }, { createJavaScriptRegexEngine }] = await Promise.all([
      import("shiki/core"),
      import("shiki/engine/javascript"),
    ])
    return createHighlighterCore({
      themes: [createCssVariablesTheme({ name: "tokens", variablePrefix: "--shiki-", fontStyle: true })],
      langs: [import("@shikijs/langs/tsx"), import("@shikijs/langs/bash")],
      engine: createJavaScriptRegexEngine(),
    })
  })()
  return highlighter
}

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      className={className}
      aria-label={copied ? "Copied" : "Copy"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        } catch {
          /* clipboard unavailable */
        }
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  )
}

export function CodeBlock({ code, lang = "tsx", className }: { code: string; lang?: Lang; className?: string }) {
  const source = code.trimEnd()
  const [html, setHtml] = useState<string>()

  useEffect(() => {
    let live = true
    getHighlighter().then((h) => {
      // Shiki escapes the source; input is our own repository files.
      if (live) setHtml(h.codeToHtml(source, { lang, theme: "tokens" }))
    })
    return () => {
      live = false
    }
  }, [source, lang])

  return (
    <div className={cn("group/code relative rounded-xl border bg-surface-sunken", className)}>
      <CopyButton value={source} className="absolute top-2 right-2 z-10 opacity-60 group-hover/code:opacity-100" />
      {html ? (
        <div className="code-block" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre className="code-block-fallback">
          <code>{source}</code>
        </pre>
      )}
    </div>
  )
}
