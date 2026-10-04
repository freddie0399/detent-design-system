import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/collapsible")({ component: CollapsiblePage })

function CollapsiblePage() {
  return (
    <ComponentDoc
      slug="collapsible"
      title="Collapsible"
      description="Shows and hides a region. The panel animates its height; the docs sidebar uses it for nested sections."
    >
      <Preview name="collapsible/demo" align="start" />
      <Guidelines
        dos={[
          "Use for secondary detail that most people won't need.",
          "Keep the trigger next to what it reveals.",
        ]}
        donts={[
          "Don't hide information people need to complete the task.",
        ]}
      />
      <Accessibility
        items={[
          "The trigger exposes aria-expanded automatically; give icon-only triggers an aria-label.",
        ]}
      />
    </ComponentDoc>
  )
}
