import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/accordion")({ component: AccordionPage })

function AccordionPage() {
  return (
    <ComponentDoc
      slug="accordion"
      title="Accordion"
      description="Vertically stacked sections that expand to reveal content. Panels animate their height."
    >
      <Preview name="accordion/demo" />
      <Section title="Multiple" description="Allow several sections open at once for settings-style pages.">
        <Preview name="accordion/multiple" />
      </Section>
      <Guidelines
        dos={[
          "Use for FAQs and long, scannable settings where people need one section at a time.",
          "Write triggers as the question or the section's name.",
        ]}
        donts={[
          "Don't hide content most people need behind an accordion.",
          "Don't use an accordion for navigation.",
        ]}
      />
      <Accessibility
        items={[
          "Triggers are buttons inside headings, with aria-expanded and aria-controls linking them to their panels.",
          "Arrow keys move focus between triggers.",
        ]}
      />
    </ComponentDoc>
  )
}
