import { Fragment } from "react"

import { Button } from "@/components/ui/button"

const VARIANTS = ["default", "secondary", "outline", "destructive"] as const
const STATES = [undefined, "hover", "active"] as const

export default function ButtonStates() {
  return (
    <div className="grid grid-cols-[5rem_repeat(3,1fr)] items-center gap-3">
      <span />
      {["Rest", "Hover", "Pressed"].map((label) => (
        <span key={label} className="eyebrow text-muted-foreground">{label}</span>
      ))}
      {VARIANTS.map((variant) => (
        <Fragment key={variant}>
          <span className="text-xs text-muted-foreground capitalize">
            {variant === "default" ? "Primary" : variant}
          </span>
          {STATES.map((state) => (
            <Button key={state ?? "rest"} variant={variant} data-preview={state} tabIndex={-1}>
              Save
            </Button>
          ))}
        </Fragment>
      ))}
    </div>
  )
}
