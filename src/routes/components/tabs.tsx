import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/tabs")({ component: TabsPage })

function TabsPage() {
  return (
    <ComponentDoc
      slug="tabs"
      title="Tabs"
      description="Switches between views of the same context. The selection is a raised segment that springs between tabs."
    >
      <Preview name="tabs/demo" align="start" />
      <Section title="Line" description="An underline style for page-level sections.">
        <Preview name="tabs/line" align="start" />
      </Section>
      <Guidelines
        dos={[
          "Use tabs for peers: views of the same thing.",
          "Keep labels to one or two words.",
        ]}
        donts={[
          "Don't use tabs for sequential steps.",
          "Don't nest tabs.",
        ]}
      />
      <Accessibility
        items={[
          "Arrow keys move between tabs; the panel is linked to its tab with aria-controls.",
        ]}
      />
    </ComponentDoc>
  )
}
