import { REGEXP_ONLY_DIGITS } from "input-otp"

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export default function InputOTPDigits() {
  return (
    <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS} inputMode="numeric" aria-label="PIN">
      <InputOTPGroup>
        {[0, 1, 2, 3].map((i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}
