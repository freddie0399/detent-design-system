import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export default function FieldHorizontal() {
  return (
    <FieldGroup className="w-full max-w-md">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="notify-mentions">Mentions</FieldLabel>
          <FieldDescription>Email me when someone @mentions me.</FieldDescription>
        </FieldContent>
        <Switch id="notify-mentions" defaultChecked />
      </Field>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="notify-digest">Weekly digest</FieldLabel>
          <FieldDescription>A summary of activity every Monday.</FieldDescription>
        </FieldContent>
        <Switch id="notify-digest" />
      </Field>
    </FieldGroup>
  )
}
