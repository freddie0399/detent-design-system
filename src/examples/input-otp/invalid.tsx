import { useState } from "react"

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export default function InputOTPInvalid() {
  const [code, setCode] = useState("482913")
  return (
    <div className="grid justify-items-center gap-2">
      <InputOTP
        maxLength={6}
        value={code}
        onChange={setCode}
        aria-label="Verification code"
        aria-invalid
        aria-describedby="otp-error"
      >
        <InputOTPGroup>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <InputOTPSlot key={i} index={i} aria-invalid />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p id="otp-error" className="text-xs text-destructive-subtle-foreground">
        That code has expired. Request a new one.
      </p>
    </div>
  )
}
