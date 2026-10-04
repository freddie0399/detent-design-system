import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/pagination")({ component: PaginationPage })

function PaginationPage() {
  return (
    <ComponentDoc
      slug="pagination"
      title="Pagination"
      description={"Moves through pages of results. The current page is a raised button among flat ones — the same \"raised means selected\" rule as segmented controls."}
    >
      <Preview name="pagination/demo" />
      <Guidelines
        dos={[
          "Show the first and last pages and a few around the current one, with ellipses between.",
          "Keep the controls in the same place on every page.",
        ]}
        donts={[
          "Don't paginate short lists — show everything, or load more on scroll.",
        ]}
      />
      <Accessibility
        items={[
          "Pagination is a nav landmark; the current page has aria-current=\"page\".",
          "Previous and Next have text labels, not just arrows.",
        ]}
      />
    </ComponentDoc>
  )
}
