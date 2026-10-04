import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export default function FieldDemo() {
  return (
    <form className="w-full max-w-md">
      <FieldSet>
        <FieldLegend>New project</FieldLegend>
        <FieldDescription>Projects group issues toward a single goal.</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="project-name">Name</FieldLabel>
            <Input id="project-name" placeholder="Website relaunch" />
          </Field>
          <Field>
            <FieldLabel htmlFor="project-summary">Summary</FieldLabel>
            <Textarea id="project-summary" placeholder="What does done look like?" />
            <FieldDescription>Shown on the project card. Markdown supported.</FieldDescription>
          </Field>
          <FieldSeparator />
          <Field orientation="horizontal">
            <FieldLabel htmlFor="project-private">Private project</FieldLabel>
            <Switch id="project-private" />
          </Field>
          <Field orientation="horizontal">
            <Button type="submit">Create project</Button>
            <Button type="button" variant="ghost">Cancel</Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
