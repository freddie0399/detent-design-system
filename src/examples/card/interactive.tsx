import { Card, CardContent } from "@/components/ui/card"

export default function CardInteractive() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-3">
      <Card size="sm" interactive>
        <CardContent>Homepage redesign</CardContent>
      </Card>
      <Card size="sm" interactive>
        <CardContent>Pricing page copy</CardContent>
      </Card>
    </div>
  )
}
