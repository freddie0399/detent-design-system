import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/dialog")({ component: DialogPage })

function DialogPage() {
  return (
    <ComponentDoc
      slug="dialog"
      title="Dialog"
      description="A modal window for focused tasks and confirmations. It floats as glass when the brand uses glass overlays."
    >
      <Preview name="dialog/demo" />
      <Section title="With a form" description="Short forms can live in a dialog; longer ones deserve a page or sheet.">
        <Preview name="dialog/form" />
      </Section>
      <Guidelines
        dos={[
          "Title the dialog with the question or task.",
          "Put the confirming action last and make it specific (\"Archive\", not \"OK\").",
        ]}
        donts={[
          "Don't open a dialog from a dialog.",
          "Don't use a dialog for information that could be inline.",
        ]}
      />
      <Accessibility
        items={[
          "Focus moves into the dialog on open, is trapped while open, and returns to the trigger on close.",
          "Escape closes the dialog; DialogTitle and DialogDescription are wired to aria-labelledby and aria-describedby.",
        ]}
      />
    </ComponentDoc>
  )
}
