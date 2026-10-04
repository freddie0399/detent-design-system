import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/sidebar")({ component: SidebarPage })

function SidebarPage() {
  return (
    <ComponentDoc
      slug="sidebar"
      title="Sidebar"
      description="App navigation with collapsible groups. The navigation on the left of this site is the live example: the active page is a raised highlight chip and group labels follow the brand's label voice."
    >
      <Section title="Example" description="Menu buttons outside the sidebar frame: default, active and outline.">
        <Preview name="sidebar/demo" />
      </Section>
      <Guidelines
        dos={[
          "Mark exactly one item active: the current page.",
          "Group long lists under collapsible parents.",
        ]}
        donts={[
          "Don't put actions that change data in the navigation.",
        ]}
      />
      <Accessibility
        items={[
          "Render menu buttons as real links (render={<Link />}) so they're announced as links and work with middle-click.",
          "SidebarTrigger toggles the sidebar and, on mobile, opens it as a focus-trapped sheet.",
        ]}
      />
    </ComponentDoc>
  )
}
