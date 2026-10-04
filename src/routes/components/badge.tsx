import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/badge")({ component: BadgePage })

function BadgePage() {
  return (
    <ComponentDoc
      slug="badge"
      title="Badge"
      description="A compact label for status or metadata. Tinted variants take their colour from their own text, so they stay legible in both themes."
    >
      <Preview name="badge/demo" />
      <Section title="Variants" description="Default and secondary for metadata; outline and ghost when the badge shouldn't compete.">
        <Preview name="badge/variants" />
      </Section>
      <Section title="Status" description="Fixed status hues with a jelly tint.">
        <Preview name="badge/status" />
      </Section>
      <Section title="With icon">
        <Preview name="badge/icon" />
      </Section>
      <Guidelines
        dos={[
          "Keep labels to one or two words.",
          "Use status variants only for status: done, at risk, blocked, in review.",
        ]}
        donts={[
          "Don't make badges look clickable unless they are; use a button or link instead.",
        ]}
      />
      <Accessibility
        items={[
          "Badges are plain text to assistive tech — make sure the word itself carries the meaning, not just the colour.",
        ]}
      />
    </ComponentDoc>
  )
}
