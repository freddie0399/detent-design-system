import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/sheet")({ component: SheetPage })

function SheetPage() {
  return (
    <ComponentDoc
      slug="sheet"
      title="Sheet"
      description="A panel that slides in from an edge. On mobile, the docs sidebar becomes a sheet."
    >
      <Preview name="sheet/demo" />
      <Section title="Sides">
        <Preview name="sheet/sides" />
      </Section>
      <Guidelines
        dos={[
          "Use a sheet to edit or inspect something without leaving the page.",
          "Open from the right for detail, from the left for navigation.",
        ]}
        donts={[
          "Don't use a sheet for a quick confirmation — use a dialog.",
        ]}
      />
      <Accessibility
        items={[
          "Like Dialog, focus is trapped while open and returns to the trigger; Escape closes it.",
        ]}
      />
    </ComponentDoc>
  )
}
