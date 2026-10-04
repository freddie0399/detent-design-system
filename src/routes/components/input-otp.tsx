import { createFileRoute } from "@tanstack/react-router"

import { Accessibility, ComponentDoc, Guidelines } from "@/docs/component-doc"
import { Section } from "@/docs/page"
import { Preview } from "@/docs/preview"

export const Route = createFileRoute("/components/input-otp")({ component: InputOtpPage })

function InputOtpPage() {
  return (
    <ComponentDoc
      slug="input-otp"
      title="Input OTP"
      description="Entry for one-time codes, one character per slot. The slots form one recessed well; the active slot shows the focus ring and a blinking caret."
    >
      <Preview name="input-otp/demo" />
      <Section title="Digits only" description="Restrict input with a pattern and show the numeric keypad on mobile.">
        <Preview name="input-otp/digits" />
      </Section>
      <Section title="Invalid">
        <Preview name="input-otp/invalid" />
      </Section>
      <Guidelines
        dos={[
          "Split long codes into groups of three with a separator.",
          "Accept pasted codes (the component does this) and submit automatically when complete.",
        ]}
        donts={[
          "Don't use for passwords or anything that isn't a short one-time code.",
        ]}
      />
      <Accessibility
        items={[
          "It's one real input underneath, so screen readers and password managers treat it as a single field; give it an aria-label.",
          "autocomplete=\"one-time-code\" lets mobile keyboards offer the code from a text message.",
        ]}
      />
    </ComponentDoc>
  )
}
