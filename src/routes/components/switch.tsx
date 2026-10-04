import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/switch")({ component: SwitchPage })

function SwitchPage() {
  return (
    <ComponentDoc
      slug="switch"
      title="Switch"
      description="Toggles a setting on or off immediately. The knob springs across and stretches while held."
    >
      <Preview name="switch/demo" />
      <Section title="Sizes and states">
        <Preview name="switch/sizes" />
      </Section>
      <Section title="Settings list" description="The common pattern: label left, switch right.">
        <Preview name="switch/settings" />
      </Section>
      <Guidelines
        dos={[
          "Use for settings that take effect immediately.",
          "Label the setting, not the state (\"Sounds\", not \"Turn sounds on\").",
        ]}
        donts={[
          "Don't use a switch inside a form that needs a Save button — use a checkbox.",
        ]}
      />
      <Accessibility
        items={[
          "Switches have role=\"switch\" and announce on/off; Space toggles them.",
          "State is shown by position and colour, never colour alone.",
        ]}
      />
    </ComponentDoc>
  )
}
