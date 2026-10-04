import { Slider } from "@/components/ui/slider"

export default function SliderRange() {
  return <Slider defaultValue={[20, 80]} aria-label="Price range" className="w-full max-w-sm" />
}
