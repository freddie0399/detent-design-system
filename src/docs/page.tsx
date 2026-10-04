import { cn } from "cn"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

/** A docs page: title, lede and stacked sections. */
export function DocsPage({
  title,
  description,
  eyebrow,
  children,
}: {
  title: string
  description: React.ReactNode
  eyebrow?: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 py-10 md:px-8">
      <header>
        {eyebrow && <div className="mb-2 eyebrow text-muted-foreground">{eyebrow}</div>}
        <h1 className="text-3xl">{title}</h1>
        <p className="mt-2 max-w-prose text-base text-muted-foreground">{description}</p>
      </header>
      {children}
    </div>
  )
}

export function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 id={slugify(title)} className="scroll-mt-16 text-xl">
        {title}
      </h2>
      {description && <p className="mt-1 max-w-prose text-muted-foreground">{description}</p>}
      <div className="mt-4">{children}</div>
    </section>
  )
}

/** A framed live example. */
export function Example({
  title,
  children,
  className,
}: {
  title?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card size="sm">
      {title && (
        <CardHeader>
          <CardTitle className="eyebrow text-muted-foreground">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn("flex flex-wrap items-center gap-2", className)}>{children}</CardContent>
    </Card>
  )
}
