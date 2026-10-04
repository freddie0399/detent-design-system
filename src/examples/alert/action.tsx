import { TriangleAlertIcon } from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function AlertWithAction() {
  return (
    <Alert variant="warning">
      <TriangleAlertIcon />
      <AlertTitle>Your trial ends in 3 days</AlertTitle>
      <AlertDescription>Add a payment method to keep your projects.</AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline">Upgrade</Button>
      </AlertAction>
    </Alert>
  )
}
