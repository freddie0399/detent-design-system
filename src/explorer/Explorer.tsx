import { useState } from "react"
import { CheckIcon, CopyIcon, RotateCcwIcon, XIcon } from "lucide-react"

import { FONTS, PRESETS, type Brand, type FontId, type PresetId } from "../../tokens/tokens"
import { brandToSource } from "./use-brand"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const fontItems = (kinds: string[]) =>
  (Object.entries(FONTS) as [FontId, (typeof FONTS)[FontId]][])
    .filter(([, f]) => kinds.includes(f.kind))
    .map(([id, f]) => ({ value: id, label: f.google.replace(/_/g, " ") }))

const UI_FONTS = fontItems(["sans"])
const MONO_FONTS = fontItems(["mono"])
const DISPLAY_FONTS = fontItems(["sans", "serif"])

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-3 border-b px-4 py-4">
      <h3 className="eyebrow text-muted-foreground">{title}</h3>
      {children}
    </section>
  )
}

function Range({
  label,
  value,
  min,
  max,
  step,
  format = String,
  track,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  format?: (v: number) => string
  track?: string
  onChange: (v: number) => void
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <Label className="font-normal text-muted-foreground">{label}</Label>
        <span className="font-mono text-xs tabular-nums">{format(value)}</span>
      </div>
      <div className="relative">
        {track && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full"
            style={{ background: track }}
          />
        )}
        <Slider
          value={[value]}
          min={min}
          max={max}
          step={step}
          onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : v)}
          className={track ? "[&_[data-slot=slider-range]]:bg-transparent [&_[data-slot=slider-track]]:bg-transparent" : undefined}
        />
      </div>
    </div>
  )
}

function Choice<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <ToggleGroup
      variant="segmented"
      size="sm"
      spacing={0.5}
      value={[value]}
      onValueChange={(v: unknown[]) => v[0] && onChange(v[0] as T)}
      className="w-full"
    >
      {options.map((o) => (
        <ToggleGroupItem key={o.value} value={o.value} className="flex-1">
          {o.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

function FontSelect({
  label,
  value,
  items,
  onChange,
}: {
  label: string
  value: FontId
  items: { value: FontId; label: string }[]
  onChange: (v: FontId) => void
}) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr] items-center gap-2">
      <Label className="font-normal text-muted-foreground">{label}</Label>
      <Select value={value} items={items} onValueChange={(v) => v && onChange(v as FontId)}>
        <SelectTrigger size="sm" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((i) => (
            <SelectItem key={i.value} value={i.value}>
              <span style={{ fontFamily: FONTS[i.value].family }}>{i.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

const hueTrack = (c: number, l: number) =>
  `linear-gradient(to right, ${Array.from({ length: 13 }, (_, i) => `oklch(${l} ${c} ${i * 30})`).join(", ")})`

export function Explorer({
  brand,
  setBrand,
  onClose,
}: {
  brand: Brand
  setBrand: (b: Brand) => void
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)
  const set = <K extends keyof Brand>(key: K, patch: Partial<Brand[K]> | Brand[K]) =>
    setBrand({
      ...brand,
      name: "Custom",
      [key]: typeof patch === "object" ? { ...(brand[key] as object), ...patch } : patch,
    })

  const activePreset = (Object.keys(PRESETS) as PresetId[]).find(
    (id) => JSON.stringify(PRESETS[id]) === JSON.stringify(brand),
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brandToSource(brand))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard blocked — the source is visible below */
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-12 shrink-0 items-center justify-between border-b px-4">
        <span className="font-medium">Direction</span>
        <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close explorer">
          <XIcon />
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <Group title="Presets">
          <div className="grid grid-cols-2 gap-1.5">
            {(Object.entries(PRESETS) as [PresetId, Brand][]).map(([id, p]) => (
              <Button
                key={id}
                variant={activePreset === id ? "secondary" : "outline"}
                size="sm"
                className="justify-start"
                onClick={() => setBrand(p)}
              >
                <span
                  className="size-2.5 rounded-full"
                  style={{ background: `oklch(${p.accent.light} ${p.accent.chroma} ${p.accent.hue})` }}
                />
                {p.name}
              </Button>
            ))}
          </div>
        </Group>

        <Group title="Accent">
          <Range
            label="Hue"
            value={brand.accent.hue}
            min={0}
            max={360}
            step={1}
            format={(v) => `${v}°`}
            track={hueTrack(Math.min(brand.accent.chroma, 0.16), 0.7)}
            onChange={(hue) => set("accent", { hue })}
          />
          <Range
            label="Chroma"
            value={brand.accent.chroma}
            min={0}
            max={0.3}
            step={0.005}
            format={(v) => v.toFixed(3)}
            onChange={(chroma) => set("accent", { chroma })}
          />
          <Range
            label="Lightness · light"
            value={brand.accent.light}
            min={0.35}
            max={0.9}
            step={0.01}
            format={(v) => v.toFixed(2)}
            onChange={(light) => set("accent", { light })}
          />
          <Range
            label="Lightness · dark"
            value={brand.accent.dark}
            min={0.45}
            max={0.95}
            step={0.01}
            format={(v) => v.toFixed(2)}
            onChange={(dark) => set("accent", { dark })}
          />
        </Group>

        <Group title="Neutrals">
          <Range
            label="Tint hue"
            value={brand.neutral.hue}
            min={0}
            max={360}
            step={1}
            format={(v) => `${v}°`}
            track={hueTrack(0.08, 0.8)}
            onChange={(hue) => set("neutral", { hue })}
          />
          <Range
            label="Tint strength"
            value={brand.neutral.chroma}
            min={0}
            max={4}
            step={0.1}
            format={(v) => `${v.toFixed(1)}×`}
            onChange={(chroma) => set("neutral", { chroma })}
          />
        </Group>

        <Group title="Type">
          <FontSelect label="UI" value={brand.type.ui} items={UI_FONTS} onChange={(ui) => set("type", { ui })} />
          <FontSelect
            label="Headings"
            value={brand.type.display}
            items={DISPLAY_FONTS}
            onChange={(display) => set("type", { display })}
          />
          <FontSelect label="Mono" value={brand.type.mono} items={MONO_FONTS} onChange={(mono) => set("type", { mono })} />
          <div className="grid gap-2">
            <Label className="font-normal text-muted-foreground">Labels</Label>
            <Choice
              value={brand.labels}
              options={[
                { value: "sentence", label: "Sentence" },
                { value: "mono-caps", label: "MONO CAPS" },
              ]}
              onChange={(labels) => set("labels", labels)}
            />
          </div>
        </Group>

        <Group title="Shape">
          <Range
            label="Controls"
            value={brand.shape.control}
            min={0}
            max={16}
            step={1}
            format={(v) => `${v}px`}
            onChange={(control) => set("shape", { control })}
          />
          <Range
            label="Containers"
            value={brand.shape.container}
            min={0}
            max={24}
            step={1}
            format={(v) => `${v}px`}
            onChange={(container) => set("shape", { container })}
          />
          <Range
            label="Overlays"
            value={brand.shape.overlay}
            min={0}
            max={28}
            step={1}
            format={(v) => `${v}px`}
            onChange={(overlay) => set("shape", { overlay })}
          />
          <div className="grid gap-2">
            <Label className="font-normal text-muted-foreground">Badges</Label>
            <Choice
              value={brand.shape.badge >= 999 ? "pill" : "match"}
              options={[
                { value: "pill", label: "Pill" },
                { value: "match", label: "Match controls" },
              ]}
              onChange={(v) => set("shape", { badge: v === "pill" ? 999 : brand.shape.control })}
            />
          </div>
        </Group>

        <Group title="Material">
          <Choice
            value={brand.elevation}
            options={[
              { value: "flat", label: "Flat" },
              { value: "soft", label: "Soft" },
              { value: "tactile", label: "Tactile" },
            ]}
            onChange={(elevation) => set("elevation", elevation)}
          />
          <div className="grid gap-2">
            <Label className="font-normal text-muted-foreground">Overlays</Label>
            <Choice
              value={brand.overlays}
              options={[
                { value: "solid", label: "Solid" },
                { value: "glass", label: "Glass" },
              ]}
              onChange={(overlays) => set("overlays", overlays)}
            />
          </div>
        </Group>

        <Group title="Density">
          <Choice
            value={brand.density}
            options={[
              { value: "compact", label: "Compact" },
              { value: "default", label: "Default" },
              { value: "comfortable", label: "Roomy" },
            ]}
            onChange={(density) => set("density", density)}
          />
        </Group>

        <section className="grid gap-2 px-4 py-4">
          <div className="flex items-center justify-between">
            <h3 className="eyebrow text-muted-foreground">Config</h3>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon-xs" onClick={() => setBrand(PRESETS.baseline)} aria-label="Reset to baseline">
                <RotateCcwIcon />
              </Button>
              <Button variant="ghost" size="icon-xs" onClick={copy} aria-label="Copy brand config">
                {copied ? <CheckIcon /> : <CopyIcon />}
              </Button>
            </div>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-surface-sunken p-3 font-mono text-2xs leading-4 text-muted-foreground">
            {brandToSource(brand)}
          </pre>
        </section>
      </div>
    </div>
  )
}
