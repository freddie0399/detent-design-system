import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/field")({ component: FieldPage })

function FieldPage() {
  return (
    <ComponentDoc
      slug="field"
      title="Field"
      description="Composes a label, control, description and error into one accessible unit, and lays out groups of them. Error text uses the readable red."
    >
      <Preview name="field/demo" />
      <Section title="Horizontal" description="Label and description on the left, control on the right: the standard settings row.">
        <Preview name="field/horizontal" />
      </Section>
      <Section title="Validation" description="Set data-invalid on the Field and aria-invalid on the control; FieldError shows the message.">
        <Preview name="field/validation" />
      </Section>
      <Guidelines
        dos={[
          "Put one question per Field, with a visible label.",
          "Use FieldDescription for help that prevents errors, before anyone makes one.",
          "Group related fields in a FieldSet with a FieldLegend.",
        ]}
        donts={[
          "Don't rely on placeholder text instead of a label or description.",
          "Don't show an error before the person has had a chance to answer.",
        ]}
      />
      <Accessibility
        items={[
          "Link descriptions and errors to the control with aria-describedby.",
          "FieldError renders with role=\"alert\", so new errors are announced.",
          "FieldSet and FieldLegend give grouped controls a shared accessible name.",
        ]}
      />
    </ComponentDoc>
  )
}
