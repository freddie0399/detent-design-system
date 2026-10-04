import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/toggle")({ component: TogglePage })

function TogglePage() {
  return (
    <ComponentDoc
      slug="toggle"
      title="Toggle"
      description="A button that latches. When on, it stays pushed into the surface — distinct from the raised selection of a segmented control."
    >
      <Preview name="toggle/demo" />
      <Section title="Outline" description="Rests raised; latches in when on.">
        <Preview name="toggle/outline" />
      </Section>
      <Section title="Sizes">
        <Preview name="toggle/sizes" />
      </Section>
      <Guidelines
        dos={[
          "Use for on/off options in toolbars.",
          "Keep the label the same in both states; the depth shows the state.",
        ]}
        donts={[
          "Don't use a toggle to choose between exclusive options — use a toggle group.",
        ]}
      />
      <Accessibility
        items={[
          "Toggles expose aria-pressed, so assistive tech announces \"pressed\" or \"not pressed\".",
          "Icon-only toggles need an aria-label.",
        ]}
      />
    </ComponentDoc>
  )
}
