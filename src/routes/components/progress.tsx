import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/progress")({ component: ProgressPage })

function ProgressPage() {
  return (
    <ComponentDoc
      slug="progress"
      title="Progress"
      description="Shows how far a task has got. The track is a recessed well and the fill is a glossy bar; with no value it becomes an indeterminate sweep."
    >
      <Preview name="progress/demo" />
      <Section title="Updating" description="The fill eases between values.">
        <Preview name="progress/live" />
      </Section>
      <Section title="Indeterminate" description="Pass value={null} when the duration is unknown.">
        <Preview name="progress/indeterminate" />
      </Section>
      <Guidelines
        dos={[
          "Label what's happening, and show the value when it's meaningful.",
          "Use indeterminate only until you can measure progress.",
        ]}
        donts={[
          "Don't use a progress bar for a value that isn't progress toward completion — use a meter.",
        ]}
      />
      <Accessibility
        items={[
          "Renders role=\"progressbar\" with aria-valuenow, min and max; the label names it.",
          "Indeterminate progress omits aria-valuenow, which is how assistive tech knows it's ongoing.",
        ]}
      />
    </ComponentDoc>
  )
}
