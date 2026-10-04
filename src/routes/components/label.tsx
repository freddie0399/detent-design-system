import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/label")({ component: LabelPage })

function LabelPage() {
  return (
    <ComponentDoc
      slug="label"
      title="Label"
      description="Names a form control. Clicking it focuses or toggles the control."
    >
      <Preview name="label/demo" />
      <Guidelines
        dos={[
          "Keep labels short and in sentence case.",
          "Wrap checkboxes and switches in the label so the text is clickable.",
        ]}
        donts={[
          "Don't end labels with a colon.",
        ]}
      />
      <Accessibility
        items={[
          "A label must be associated with its control, by wrapping it or with htmlFor/id.",
        ]}
      />
    </ComponentDoc>
  )
}
