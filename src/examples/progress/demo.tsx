import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"

export default function ProgressDemo() {
  return (
    <Progress value={64} className="w-full max-w-sm">
      <ProgressLabel>Uploading assets</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}
