import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/table")({ component: TablePage })

function TablePage() {
  return (
    <ComponentDoc
      slug="table"
      title="Table"
      description="Dense, scannable rows. Headers use the brand's label voice."
    >
      <Preview name="table/demo" align="stretch" />
      <Guidelines
        dos={[
          "Right-align numbers and use tabular-nums.",
          "Put the identifying column first.",
          "Use the mono face for IDs.",
        ]}
        donts={[
          "Don't use a table for layout.",
          "Don't hide essential columns on small screens without another way to reach them.",
        ]}
      />
      <Accessibility
        items={[
          "Use real table markup (these components render it) so screen readers can announce row and column headers.",
        ]}
      />
    </ComponentDoc>
  )
}
