import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/command")({ component: CommandPage })

function CommandPage() {
  return (
    <ComponentDoc
      slug="command"
      title="Command"
      description="A searchable list of commands. Use inline, or as a ⌘K palette in a dialog. The selected row is the raised highlight chip. Built on cmdk."
    >
      <Preview name="command/demo" />
      <Section title="Command palette" description="Opened from a button or ⌘K, in a glass dialog.">
        <Preview name="command/dialog" />
      </Section>
      <Guidelines
        dos={[
          "Group commands and give each group a heading.",
          "Show shortcuts for commands that have them.",
          "Close the palette after running a command.",
        ]}
        donts={[
          "Don't make the palette the only way to reach a feature.",
        ]}
      />
      <Accessibility
        items={[
          "The input owns focus; arrow keys move the selection and Enter runs it.",
          "Results are announced as a listbox with the active option tracked via aria-activedescendant.",
          "The dialog version carries a screen-reader-only title and description.",
        ]}
      />
    </ComponentDoc>
  )
}
