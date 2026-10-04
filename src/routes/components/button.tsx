import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/button")({ component: ButtonPage })

function ButtonPage() {
  return (
    <ComponentDoc
      slug="button"
      title="Button"
      description="The primary way to take an action. Solid buttons are glossy and glow in their own colour; outline and secondary buttons are raised objects that press in."
    >
      <Preview name="button/demo" />
      <Section title="Variants" description="One primary action per view. Secondary and outline for alternatives; ghost for low-emphasis actions in dense UI.">
        <Preview name="button/variants" />
      </Section>
      <Section title="Sizes" description="Default is 32px (at default density). Use small in toolbars and dense rows; large for prominent calls to action.">
        <Preview name="button/sizes" />
      </Section>
      <Section title="With icons" description="Mark icons with data-icon so padding balances around them.">
        <Preview name="button/icons" />
      </Section>
      <Section title="States" description="Rest, hover and pressed, pinned with data-preview. Hover lifts the button; pressing sinks it.">
        <Preview name="button/states" align="stretch" />
      </Section>
      <Section title="Disabled">
        <Preview name="button/disabled" />
      </Section>
      <Guidelines
        dos={[
          "Label buttons with a verb: \"Create issue\", not \"OK\".",
          "Keep one primary button per view or dialog.",
          "Use destructive-subtle for reversible destructive actions (archive) and destructive for permanent ones.",
        ]}
        donts={[
          "Don't place two solid buttons side by side — demote one to outline or secondary.",
          "Don't disable a button without explaining why nearby.",
        ]}
      />
      <Accessibility
        items={[
          "Icon-only buttons need an aria-label.",
          "The focus ring is a 2px solid ring in the ring token, which passes 3:1 against the page in every preset.",
          "Disabled buttons are removed from pointer events; if users need to know why, keep it enabled and explain on click instead.",
        ]}
      />
    </ComponentDoc>
  )
}
