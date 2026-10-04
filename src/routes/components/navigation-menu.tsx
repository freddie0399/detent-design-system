import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/navigation-menu")({ component: NavigationMenuPage })

function NavigationMenuPage() {
  return (
    <ComponentDoc
      slug="navigation-menu"
      title="Navigation menu"
      description="Top-level site navigation with rich dropdown panels. Panels are glass and morph between menus on the brand spring; the open trigger and the current link get the raised highlight."
    >
      <Preview name="navigation-menu/demo" />
      <Guidelines
        dos={[
          "Use for a handful of top-level sections on marketing or docs sites.",
          "Give panel links a short description so people can choose without clicking.",
        ]}
        donts={[
          "Don't use for app navigation — use a sidebar.",
          "Don't nest navigation menus.",
        ]}
      />
      <Accessibility
        items={[
          "Triggers are buttons with aria-expanded; arrow keys move between them and Escape closes the panel.",
          "Panel links are real links, so they work with middle-click and assistive tech.",
        ]}
      />
    </ComponentDoc>
  )
}
