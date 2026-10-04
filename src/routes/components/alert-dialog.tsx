import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/alert-dialog")({ component: AlertDialogPage })

function AlertDialogPage() {
  return (
    <ComponentDoc
      slug="alert-dialog"
      title="Alert dialog"
      description="A modal that interrupts to confirm a consequential action. Unlike Dialog, it can't be dismissed by clicking outside."
    >
      <Preview name="alert-dialog/demo" />
      <Section title="Small" description="For short confirmations with a two-button footer.">
        <Preview name="alert-dialog/small" />
      </Section>
      <Guidelines
        dos={[
          "Name the consequence in the title and description.",
          "Label the confirming button with the action (\"Delete project\"), and make it destructive when it's irreversible.",
        ]}
        donts={[
          "Don't use for anything that can be undone — prefer an undo toast.",
          "Don't stack an alert dialog on another dialog.",
        ]}
      />
      <Accessibility
        items={[
          "Uses role=\"alertdialog\"; focus is trapped and starts on the least destructive action.",
          "Escape cancels.",
        ]}
      />
    </ComponentDoc>
  )
}
