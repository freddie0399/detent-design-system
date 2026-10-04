import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/kbd")({ component: KbdPage })

function KbdPage() {
  return (
    <ComponentDoc
      slug="kbd"
      title="Kbd"
      description="A keyboard key, rendered as a raised keycap."
    >
      <Preview name="kbd/demo" />
      <Section title="Inline" description="Keycaps sit on the text baseline in running copy and tooltips.">
        <Preview name="kbd/inline" />
      </Section>
      <Guidelines
        dos={[
          "Use platform symbols (⌘ ⇧ ⌥) on macOS and words (Ctrl, Shift) elsewhere.",
        ]}
        donts={[
          "Don't use keycaps for things that aren't keys.",
        ]}
      />
      <Accessibility
        items={[
          "Screen readers read the key's text; spell out symbol-only keys with aria-label (\"Command\") where it matters.",
        ]}
      />
    </ComponentDoc>
  )
}
