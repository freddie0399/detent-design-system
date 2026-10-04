import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/breadcrumb")({ component: BreadcrumbPage })

function BreadcrumbPage() {
  return (
    <ComponentDoc
      slug="breadcrumb"
      title="Breadcrumb"
      description="Shows where the current page sits in a hierarchy, with a link back to each level."
    >
      <Preview name="breadcrumb/demo" />
      <Section title="Collapsed" description="Collapse the middle of deep paths into a menu.">
        <Preview name="breadcrumb/collapsed" />
      </Section>
      <Guidelines
        dos={[
          "Start from the highest meaningful level and end on the current page.",
          "Collapse the middle, not the ends, when space runs out.",
        ]}
        donts={[
          "Don't use a breadcrumb for flat sites or as a replacement for the main navigation.",
          "Don't make the current page a link.",
        ]}
      />
      <Accessibility
        items={[
          "Breadcrumb renders a nav landmark named \"breadcrumb\"; BreadcrumbPage carries aria-current=\"page\".",
          "Separators are hidden from assistive tech.",
        ]}
      />
    </ComponentDoc>
  )
}
