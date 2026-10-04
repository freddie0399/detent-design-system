import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/popover")({ component: PopoverPage })

function PopoverPage() {
  return (
    <ComponentDoc
      slug="popover"
      title="Popover"
      description="Rich, interactive content anchored to a trigger: forms, filters, share sheets. Floats as glass with the container radius."
    >
      <Preview name="popover/demo" />
      <Section title="Placement" description="Prefer the default (bottom); it flips automatically when there isn't room.">
        <Preview name="popover/sides" />
      </Section>
      <Guidelines
        dos={[
          "Use for small, self-contained tasks related to the trigger.",
          "Give it a title when the content isn't obvious from the trigger.",
        ]}
        donts={[
          "Don't put a whole form flow in a popover — use a sheet or dialog.",
          "Don't use a popover for plain text hints — use a tooltip.",
        ]}
      />
      <Accessibility
        items={[
          "Focus moves into the popover when it opens and returns to the trigger on close; Escape closes it.",
          "Unlike a tooltip, content can be interactive and is reachable by keyboard and touch.",
        ]}
      />
    </ComponentDoc>
  )
}
