import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export default function ButtonGroupSizes() {
  return (
    <div className="flex flex-col items-start gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <ButtonGroup key={size}>
          <Button variant="outline" size={size}>Day</Button>
          <Button variant="outline" size={size}>Week</Button>
          <Button variant="outline" size={size}>Month</Button>
        </ButtonGroup>
      ))}
    </div>
  )
}
