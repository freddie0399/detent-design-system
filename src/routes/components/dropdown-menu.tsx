import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/dropdown-menu")({ component: DropdownMenuPage })

function DropdownMenuPage() {
  return (
    <ComponentDoc
      slug="dropdown-menu"
      title="Dropdown menu"
      description="A list of actions from a trigger. The highlighted row is a raised chip above the glass; destructive rows take a red tint."
    >
      <Preview name="dropdown-menu/demo" />
      <Section title="Checkbox and radio items" description="For view options that toggle or choose one of several.">
        <Preview name="dropdown-menu/checkbox-radio" />
      </Section>
      <Section title="Submenu">
        <Preview name="dropdown-menu/submenu" />
      </Section>
      <Guidelines
        dos={[
          "Order items by frequency, and group them with separators.",
          "Show keyboard shortcuts for frequent actions.",
          "Put destructive items last, separated.",
        ]}
        donts={[
          "Don't nest submenus more than one level deep.",
          "Don't put navigation in an actions menu.",
        ]}
      />
      <Accessibility
        items={[
          "Arrow keys move the highlight, typing jumps to matching items, and Escape closes and returns focus to the trigger.",
          "Checkbox and radio items expose their checked state to assistive tech.",
        ]}
      />
    </ComponentDoc>
  )
}
