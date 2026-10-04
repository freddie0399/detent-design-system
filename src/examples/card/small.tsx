import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CardSmall() {
  return (
    <Card size="sm" className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Cycle 24</CardTitle>
        <CardDescription>Ends Friday</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground">18 of 26 issues done.</CardContent>
    </Card>
  )
}
