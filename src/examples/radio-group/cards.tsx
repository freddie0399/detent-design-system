import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const PLANS = [
  { value: "starter", title: "Starter", description: "Up to 3 projects and 5 members." },
  { value: "team", title: "Team", description: "Unlimited projects, cycles and insights." },
  { value: "enterprise", title: "Enterprise", description: "SSO, audit logs and priority support." },
]

export default function RadioGroupCards() {
  return (
    <RadioGroup defaultValue="team" aria-label="Plan" className="w-full max-w-sm">
      {PLANS.map((plan) => (
        <FieldLabel key={plan.value} htmlFor={`plan-${plan.value}`}>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>{plan.title}</FieldTitle>
              <FieldDescription>{plan.description}</FieldDescription>
            </FieldContent>
            <RadioGroupItem value={plan.value} id={`plan-${plan.value}`} />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  )
}
