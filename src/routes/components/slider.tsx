import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/slider")({ component: SliderPage })

function SliderPage() {
  return (
    <ComponentDoc
      slug="slider"
      title="Slider"
      description="Picks a value from a range. The track is recessed and the thumb is a physical knob."
    >
      <Preview name="slider/demo" />
      <Section title="Range" description="Two thumbs select a range.">
        <Preview name="slider/range" />
      </Section>
      <Section title="Disabled">
        <Preview name="slider/disabled" />
      </Section>
      <Guidelines
        dos={[
          "Show the current value nearby when precision matters.",
          "Use for approximate values; use an input for exact ones.",
        ]}
        donts={[
          "Don't use a slider for a small set of discrete options — use a segmented control.",
        ]}
      />
      <Accessibility
        items={[
          "Arrow keys step the value; Page Up/Down and Home/End jump.",
          "Every thumb needs an accessible name.",
        ]}
      />
    </ComponentDoc>
  )
}
