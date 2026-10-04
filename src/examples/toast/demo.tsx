import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

export default function ToastDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.add({
          title: "Project saved",
          description: "Your changes are visible to the team.",
          type: "success",
        })
      }
    >
      Save project
    </Button>
  )
}
