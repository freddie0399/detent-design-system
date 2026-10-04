import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/card")({ component: CardPage })

function CardPage() {
  return (
    <ComponentDoc
      slug="card"
      title="Card"
      description="A raised surface that groups related content. Interactive cards lift on hover and can be picked up."
    >
      <Preview name="card/demo" />
      <Section title="Small" description="Tighter spacing for dense layouts and grids.">
        <Preview name="card/small" />
      </Section>
      <Section title="Interactive" description="Hover to lift; press and hold to pick up. Set data-dragging from a drag library for the same look.">
        <Preview name="card/interactive" />
      </Section>
      <Guidelines
        dos={[
          "Group one idea per card.",
          "Use interactive cards only when the whole card is draggable or opens something.",
        ]}
        donts={[
          "Don't nest cards inside cards; use a divider or a sunken region instead.",
        ]}
      />
      <Accessibility
        items={[
          "An interactive card that opens something should contain (or be) a real link or button so it's reachable by keyboard.",
        ]}
      />
    </ComponentDoc>
  )
}
