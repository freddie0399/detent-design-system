import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

const exportReport = () => new Promise<number>((resolve) => setTimeout(() => resolve(128), 1800))

export default function ToastPromise() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.promise(exportReport(), {
          loading: { title: "Exporting report…", type: "loading" },
          success: (rows) => ({ title: "Report ready", description: `${rows} issues exported.`, type: "success" }),
          error: { title: "Export failed", type: "error" },
        })
      }
    >
      Export report
    </Button>
  )
}
