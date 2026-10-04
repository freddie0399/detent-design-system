import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldValidation() {
  return (
    <Field data-invalid className="w-full max-w-sm">
      <FieldLabel htmlFor="invite-email">Invite by email</FieldLabel>
      <Input id="invite-email" type="email" defaultValue="alex@" aria-invalid aria-describedby="invite-email-error" />
      <FieldDescription>We'll send them a link to join the workspace.</FieldDescription>
      <FieldError id="invite-email-error" errors={[{ message: "Enter a complete email address." }]} />
    </Field>
  )
}
