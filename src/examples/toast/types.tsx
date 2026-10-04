import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

const TYPES = [
  { type: "success", title: "Deployed", description: "Build 4f2a91c is live." },
  { type: "info", title: "Sync in progress", description: "Changes will appear shortly." },
  { type: "warning", title: "Approaching limit", description: "82% of this hour's quota used." },
  { type: "error", title: "Upload failed", description: "The file is larger than 25 MB." },
]

export default function ToastTypes() {
  return (
    <div className="flex flex-wrap gap-2">
      {TYPES.map((t) => (
        <Button key={t.type} variant="outline" className="capitalize" onClick={() => toast.add(t)}>
          {t.type}
        </Button>
      ))}
    </div>
  )
}
