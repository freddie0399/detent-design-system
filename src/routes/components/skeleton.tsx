import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/skeleton")({ component: SkeletonPage })

function SkeletonPage() {
  return (
    <ComponentDoc
      slug="skeleton"
      title="Skeleton"
      description="A placeholder that holds the shape of content while it loads. In tactile brands placeholders are wells that the content fills; under reduced motion the pulse stops."
    >
      <Preview name="skeleton/demo" align="start" />
      <Section title="Card" description="Match the loaded layout so nothing shifts when content arrives.">
        <Preview name="skeleton/card" />
      </Section>
      <Guidelines
        dos={[
          "Mirror the real layout's shapes and sizes.",
          "Use for loads longer than ~300ms.",
        ]}
        donts={[
          "Don't show skeletons for instant content — the flash is worse than nothing.",
        ]}
      />
      <Accessibility
        items={[
          "Mark the loading region aria-busy=\"true\" and announce completion if the content is important.",
        ]}
      />
    </ComponentDoc>
  )
}
