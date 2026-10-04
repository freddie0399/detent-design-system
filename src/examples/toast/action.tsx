import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

export default function ToastWithAction() {
  return (
    <Button
      variant="destructive-subtle"
      onClick={() => {
        const id = toast.add({
          title: "Issue archived",
          description: "ENG-1042 was moved to the archive.",
          actionProps: {
            children: "Undo",
            onClick: () => {
              toast.close(id)
              toast.add({ title: "Issue restored", type: "success" })
            },
          },
        })
      }}
    >
      Archive issue
    </Button>
  )
}
