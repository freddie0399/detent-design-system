import { Suspense, lazy, use, type ComponentType } from "react"
import { cn } from "cn"

import { CodeBlock } from "./code-block"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Every example is a real file in src/examples/<component>/<name>.tsx. The
// preview renders it; the Code tab shows its source, so they can't drift.
const modules = import.meta.glob<{ default: ComponentType }>("../examples/**/*.tsx")
const sources = import.meta.glob<string>("../examples/**/*.tsx", { query: "?raw", import: "default" })

// lazy() only records the loader; nothing downloads until an example renders.
const examples = Object.fromEntries(Object.entries(modules).map(([key, load]) => [key, lazy(load)]))
const sourcePromises = new Map<string, Promise<string>>()

const keyFor = (name: string) => `../examples/${name}.tsx`

function Source({ name }: { name: string }) {
  let p = sourcePromises.get(name)
  if (!p) {
    p = sources[keyFor(name)]()
    sourcePromises.set(name, p)
  }
  return <CodeBlock code={use(p)} />
}

export function Preview({
  name,
  align = "center",
  className,
}: {
  /** Example path under src/examples, without extension: "button/variants". */
  name: string
  align?: "center" | "start" | "stretch"
  className?: string
}) {
  const Example = examples[keyFor(name)]
  if (!Example) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Missing example</AlertTitle>
        <AlertDescription>
          No file at <code className="font-mono">src/examples/{name}.tsx</code>.
        </AlertDescription>
      </Alert>
    )
  }
  return (
    <Tabs defaultValue="preview" className="gap-2">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div
          className={cn(
            "flex min-h-36 rounded-xl border bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[16px_16px] p-6 sm:p-8",
            align === "center" && "items-center justify-center",
            align === "start" && "items-start justify-start",
            align === "stretch" && "flex-col items-stretch",
            className,
          )}
        >
          <Suspense fallback={<Skeleton className="h-8 w-48" />}>
            <Example />
          </Suspense>
        </div>
      </TabsContent>
      <TabsContent value="code">
        <Suspense fallback={<Skeleton className="h-36 w-full rounded-xl" />}>
          <Source name={name} />
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}
