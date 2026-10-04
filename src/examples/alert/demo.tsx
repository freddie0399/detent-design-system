import { InfoIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertDemo() {
  return (
    <Alert variant="info">
      <InfoIcon />
      <AlertTitle>Sync in progress</AlertTitle>
      <AlertDescription>Changes will appear for teammates in a few seconds.</AlertDescription>
    </Alert>
  )
}
