import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/hover-card")({ component: HoverCardPage })

function HoverCardPage() {
  return (
    <ComponentDoc
      slug="hover-card"
      title="Hover card"
      description="A preview of a linked person or object, shown on hover or focus. Built on Base UI's Preview Card."
    >
      <Preview name="hover-card/demo" />
      <Guidelines
        dos={[
          "Use to preview something the link points to (a person, an issue).",
          "Keep it glanceable: avatar, name, one or two facts.",
        ]}
        donts={[
          "Don't put actions or anything essential in a hover card — touch users can't hover.",
        ]}
      />
      <Accessibility
        items={[
          "The trigger must be a real link that works on its own; the card is a progressive enhancement.",
          "It opens on keyboard focus as well as hover.",
        ]}
      />
    </ComponentDoc>
  )
}
