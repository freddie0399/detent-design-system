import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/avatar")({ component: AvatarPage })

function AvatarPage() {
  return (
    <ComponentDoc
      slug="avatar"
      title="Avatar"
      description="A person or team, shown as an image with initials as the fallback."
    >
      <Preview name="avatar/demo" />
      <Section title="Sizes" description="Small for dense rows and tables, default for lists, large for profiles.">
        <Preview name="avatar/sizes" />
      </Section>
      <Section title="Group" description="Overlapping avatars for assignees or participants, with a count for the rest.">
        <Preview name="avatar/group" />
      </Section>
      <Guidelines
        dos={[
          "Always provide a fallback; images fail and load late.",
          "Use the small size in tables so rows stay 36px.",
        ]}
        donts={[
          "Don't use avatars as the only way to identify a person — show a name nearby or in a tooltip.",
        ]}
      />
      <Accessibility
        items={[
          "Give AvatarImage a meaningful alt (the person's name), or an empty alt when the name is already visible next to it.",
        ]}
      />
    </ComponentDoc>
  )
}
