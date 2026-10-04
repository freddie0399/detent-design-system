import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/toast")({ component: ToastPage })

function ToastPage() {
  return (
    <ComponentDoc
      slug="toast"
      title="Toast"
      description="A brief, non-blocking message about something that just happened. Toasts float as glass, travel in on the brand spring, stack, and can be swiped away. Built on Base UI's Toast with a single toast manager."
    >
      <Preview name="toast/demo" />
      <Section title="Types" description="Status types add a status-coloured icon. A loading type shows a spinner.">
        <Preview name="toast/types" />
      </Section>
      <Section title="With an action" description="Offer a single undo-style action for reversible operations.">
        <Preview name="toast/action" />
      </Section>
      <Section title="Promises" description="Track an async task: loading, then success or error, in one toast.">
        <Preview name="toast/promise" />
      </Section>
      <Guidelines
        dos={[
          "Mount <Toaster> once at the app root, then call toast.add() from anywhere.",
          "Confirm outcomes of actions the person just took.",
          "Prefer an Undo action over a confirmation dialog for reversible actions.",
        ]}
        donts={[
          "Don't put information people need to act on later in a toast — it disappears.",
          "Don't show more than one toast for the same event.",
        ]}
      />
      <Accessibility
        items={[
          "Toasts are announced through a live region without stealing focus.",
          "Hovering or focusing the stack pauses dismissal; F6 moves focus to the toasts.",
          "Give actions a clear label, and keep timeouts long enough to read and act.",
        ]}
      />
    </ComponentDoc>
  )
}
