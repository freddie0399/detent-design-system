import { useEffect, useState } from "react"

import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"

export default function ProgressLive() {
  const [value, setValue] = useState(8)

  useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 8 : Math.min(100, v + 9))), 700)
    return () => clearInterval(id)
  }, [])

  return (
    <Progress value={value} className="w-full max-w-sm">
      <ProgressLabel>Importing issues</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}
