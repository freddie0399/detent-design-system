import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/textarea")({ component: TextareaPage })

function TextareaPage() {
  return (
    <ComponentDoc
      slug="textarea"
      title="Textarea"
      description="A multi-line text field that grows with its content."
    >
      <Preview name="textarea/demo" />
      <Section title="Invalid">
        <Preview name="textarea/invalid" />
      </Section>
      <Guidelines
        dos={[
          "Let it grow with content (it does by default) instead of scrolling inside a tiny box.",
        ]}
        donts={[
          "Don't use a textarea for single-line values.",
        ]}
      />
      <Accessibility
        items={[
          "Same as Input: visible label, aria-invalid and aria-describedby for errors.",
        ]}
      />
    </ComponentDoc>
  )
}
