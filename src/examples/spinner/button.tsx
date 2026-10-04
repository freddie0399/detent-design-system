import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerInButton() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button disabled>
        <Spinner data-icon="inline-start" /> Saving…
      </Button>
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" /> Loading
      </Button>
    </div>
  )
}
