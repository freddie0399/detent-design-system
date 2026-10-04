import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/button-group")({ component: ButtonGroupPage })

function ButtonGroupPage() {
  return (
    <ComponentDoc
      slug="button-group"
      title="Button group"
      description="Joins related buttons, inputs and menus into one control. Inner corners and borders collapse so the set reads as a single raised object."
    >
      <Preview name="button-group/demo" />
      <Section title="Split button" description="A primary action with its alternatives behind a menu.">
        <Preview name="button-group/split" />
      </Section>
      <Section title="Sizes">
        <Preview name="button-group/sizes" />
      </Section>
      <Section title="Orientation">
        <Preview name="button-group/orientation" />
      </Section>
      <Section title="With input" description="Pair an input with an action, or prefix it with fixed text.">
        <Preview name="button-group/input" />
      </Section>
      <Guidelines
        dos={[
          "Group actions that act on the same object.",
          "Nest groups to separate clusters of actions with a gap.",
          "Give every item in a group the same variant and size.",
        ]}
        donts={[
          "Don't use a button group to choose between options — use a toggle group.",
          "Don't mix filled and outline buttons in one group, except in a split button.",
        ]}
      />
      <Accessibility
        items={[
          "The group renders role=\"group\"; give it an aria-label when the buttons' purpose isn't clear from their own labels.",
          "Icon-only buttons need an aria-label.",
          "Each button stays its own tab stop, unlike a toggle group's arrow-key navigation.",
        ]}
      />
    </ComponentDoc>
  )
}
