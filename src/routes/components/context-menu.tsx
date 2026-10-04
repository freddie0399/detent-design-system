import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/context-menu")({ component: ContextMenuPage })

function ContextMenuPage() {
  return (
    <ComponentDoc
      slug="context-menu"
      title="Context menu"
      description="Actions for whatever is under the pointer, opened with right-click or long-press. Items share the dropdown menu's raised highlight and red destructive tint."
    >
      <Preview name="context-menu/demo" />
      <Section title="Checkbox and radio items" description="For view options on a surface, like density or wrapping.">
        <Preview name="context-menu/options" />
      </Section>
      <Guidelines
        dos={[
          "Mirror actions that are also available elsewhere (a toolbar or a dropdown).",
          "Show shortcuts so people can learn them.",
        ]}
        donts={[
          "Don't hide actions only in a context menu — it's undiscoverable.",
        ]}
      />
      <Accessibility
        items={[
          "Opens with the context-menu key and Shift+F10 as well as right-click; arrow keys and typeahead navigate items.",
        ]}
      />
    </ComponentDoc>
  )
}
