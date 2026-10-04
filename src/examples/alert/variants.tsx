import { AlertCircleIcon, CheckCircle2Icon, InfoIcon, TriangleAlertIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertVariants() {
  return (
    <div className="grid gap-3">
      <Alert>
        <InfoIcon />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>Neutral information that sits on the card surface.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CheckCircle2Icon />
        <AlertTitle>Deployed to production</AlertTitle>
        <AlertDescription>Build 4f2a91c is live in all regions.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>Approaching rate limit</AlertTitle>
        <AlertDescription>82% of this hour's quota used.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>Update your billing details to keep the workspace active.</AlertDescription>
      </Alert>
    </div>
  )
}
