import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/separator")({ component: SeparatorPage })

function SeparatorPage() {
  return (
    <ComponentDoc
      slug="separator"
      title="Separator"
      description="A hairline that divides content, horizontally or vertically."
    >
      <Preview name="separator/demo" align="start" />
      <Guidelines
        dos={[
          "Prefer spacing to separate groups; reach for a line when spacing alone is ambiguous.",
        ]}
        donts={[
          "Don't stack separators with borders on the same edge.",
        ]}
      />
      <Accessibility
        items={[
          "Separators are decorative by default; set decorative={false} only when the division is meaningful to assistive tech.",
        ]}
      />
    </ComponentDoc>
  )
}
