import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/spinner")({ component: SpinnerPage })

function SpinnerPage() {
  return (
    <ComponentDoc
      slug="spinner"
      title="Spinner"
      description="A compact indicator for short, unmeasured waits — inside buttons, rows and toasts."
    >
      <Preview name="spinner/demo" />
      <Section title="In a button" description="Disable the button and change its label while the action runs.">
        <Preview name="spinner/button" />
      </Section>
      <Guidelines
        dos={[
          "Pair a spinner with text that says what's happening.",
          "Use for waits under a few seconds; use skeletons or progress for longer ones.",
        ]}
        donts={[
          "Don't show a spinner for instant actions.",
          "Don't put several spinners on screen for one operation.",
        ]}
      />
      <Accessibility
        items={[
          "Renders role=\"status\" with an accessible name of \"Loading\"; pass aria-label to be more specific.",
          "Under reduced motion the spinner stops rotating but stays visible.",
        ]}
      />
    </ComponentDoc>
  )
}
