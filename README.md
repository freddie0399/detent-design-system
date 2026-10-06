# Detent

A shadcn-based design system on Base UI primitives: tactile controls lit from above, every token generated from a small brand description, and contrast and colour-blind safety checked in CI.

A *detent* is the small click a dial or switch makes as it settles into position. The name is the system's signature: tactile controls lit from above that press in, latch, and spring into place.

## How it's put together

```
tokens/tokens.ts          ← source of truth: primitives → semantic (light/dark) → scales
scripts/build-tokens.ts   ← compiles tokens into ↓
  src/styles/tokens.css   ← used by the playground
  registry.json           ← theme + fonts + one item per component
src/components/ui/*       ← shadcn components (Base UI), restyled via tokens
src/routes/**             ← docs site pages (TanStack Router, file-based)
src/docs/nav.ts           ← docs navigation (typed against the route tree)
src/docs/page.tsx         ← DocsPage / Section / Example page building blocks
public/r/*.json           ← built registry (git-ignored, served statically)
```

**Rules**

- Components only reference **semantic** tokens (`bg-primary`, `text-muted-foreground`, `border-border-strong`), never primitives or raw colours.
- Every semantic token must exist in both `light` and `dark`. The build fails if one is missing.
- `src/styles/tokens.css` and `registry.json` are generated. Edit `tokens/tokens.ts` instead.
- Contrast is audited on every token build (`tokens/contrast.ts`): each foreground/background pair components render is checked against WCAG 2 in both themes, and failures print a warning. The Colour docs page shows the same audit for the live brand.
- Red *text* uses `destructive-subtle-foreground`; `destructive` is the fill. In dark mode these need opposite lightness, so don't use `text-destructive` for text.

## Brand & directions

Every token is generated from one `Brand` object in `tokens/tokens.ts`, which has seven settings:

| Setting | Controls |
|---|---|
| `accent` | hue, chroma, and primary lightness per theme. The ramp, rings, hover, subtle fills and on-primary text all derive from these |
| `neutral` | tint hue and strength for every grey |
| `type` | UI, heading and mono typefaces (see `FONTS`) |
| `shape` | control / container / overlay / badge radii |
| `elevation` | Material: `flat` (borders only), `soft` (hairline + layered shadow) or `tactile` (lit from above, see below) |
| `overlays` | `solid` or `glass` (translucent menus, popovers and dialogs with backdrop blur) |
| `labels` | `sentence` or `mono-caps`, applied through the `eyebrow` utility (table headers, menu labels) |
| `density` | scales Tailwind's `--spacing`, so every `h-*`, `p-*` and `gap-*` compresses or relaxes together |

The playground's **Direction** panel edits these live and shows the resulting config. Five presets are included: **Detent** (the default), **Baseline**, **Instrument**, **Graphite** and **Field**. To lock in a direction, paste the config over `brand` in `tokens/tokens.ts` and run `npm run tokens`.

### Materials

Components use nine material utilities instead of hard-coded fills and shadows. Each brand's `elevation` decides what they look like, so the same markup renders flat, soft or tactile.

| Utility | Role | Used by |
|---|---|---|
| `material-raised` | An object sitting on the surface. Presses in when clicked | outline/secondary buttons, select triggers, keycaps, active tab/segment |
| `material-solid` | A glossy coloured fill with a glow in its own colour (set with `--material-tint`) | primary/destructive buttons, checked checkbox, default badge |
| `material-recessed` | A well in the surface | inputs, textareas, switch/slider tracks, tab lists, segmented trays, board lanes |
| `material-knob` | A lit, physical thumb | switch and slider thumbs |
| `material-tint` | A jelly tint derived from `currentColor` | status badges, subtle buttons |
| `material-latched` | A toggle that is on: pushed into the surface and held there | pressed `Toggle` (ghost and outline) |
| `material-highlight` | The highlighted row: a small raised chip above the glass | menu and select items (`focus` / `data-highlighted`) |
| `material-lift` | Something you can pick up: lifts on hover, rises, scales and tilts while held or `data-dragging` | `<Card interactive>` |
| `material-overlay` | Glass blur and an edge highlight for floating layers | menus, select popups, dialogs |

**States and motion.** In tactile mode, hover is lighting rather than colour: raised and solid controls lift, with a brighter top highlight, a deeper shadow and a stronger glow. Pressing sinks them 1px into an inner shadow. Rest, hover and pressed shadow lists share one shape, so they interpolate smoothly. Physical objects (the switch knob and the sliding tab indicator) move on `ease-spring`, and the knob stretches while held. The checkmark pops in. Everything respects `prefers-reduced-motion`. Add `data-preview="hover" | "active"` to any material element to pin a state for documentation.

`material-tint` strength can be scaled per component with `--tint-strength` (the secondary badge uses `0.5`).

In tactile mode there's one light source, above: raised things catch a highlight on their top edge and cast a shadow, and recessed things take an inner shadow on their top edge. The utilities write into Tailwind's shadow stack (`--tw-shadow`), so `ring-*` focus styles still compose on top.

Chart colours (`chart-1`…`chart-8`) are a **fixed, colour-blind-validated categorical order**, the same for every brand (`CHART` in `tokens/tokens.ts`). They used to be generated by rotating the accent hue, which put indistinguishable pairs side by side for deuteranopes in three presets. Assign series in slot order; never cycle, skip or pick by value, and fold a ninth series into "Other". Light-mode slots 3–5 are below 3:1 on white, so charts using them must keep a legend and a table view.

Status colours (success / warning / destructive / info) use fixed hues and never follow the accent, so their meaning stays stable.

## Foundations (Detent)

| | Decision | Why |
|---|---|---|
| Colour | OKLCH ramps; green-tinted neutrals; a lime accent (hue 128) | A signal colour that's ours, on neutrals that never read as pure grey |
| Surfaces | `background` → `card` → `popover`; glass for floating layers | Depth comes from material and light, not heavy shadows |
| Material | Tactile: raised, recessed, latched, knob, tint | One light source from above; pressed in means on, raised means selected |
| Type | IBM Plex Sans + IBM Plex Mono; 13px UI default on a 4px baseline | Dense, legible UI text; a mono face for IDs and code |
| Density | 32px controls, 28px `sm`, 24px `xs` | Compact enough for data-heavy screens |
| Radius | 6px controls, 10px containers, 14px overlays, pill badges | Concentric nesting; softer as surfaces get larger |
| Focus | 2px solid ring on the `ring` token | Always visible, never a soft glow |
| Motion | 110ms `ease-standard`; physical objects on `ease-spring` | Fast by default; things that move like objects settle like objects |
| Status | `success` / `warning` / `info` / `destructive`, each with `-subtle` + `-subtle-foreground` | Fixed hues, so meaning never follows the brand accent |

## Scripts

```bash
npm run dev        # playground at http://localhost:5173
npm run tokens     # regenerate tokens.css + registry.json (contrast problems warn)
npm run registry   # tokens + `shadcn build` → public/r
npm run build      # registry + typecheck + production build
npm run check      # what CI enforces: strict tokens, lint, typecheck
```

## CI

`.github/workflows/ci.yml` runs on every pull request and on pushes to `main`:

1. **Tokens, strict** (`npm run tokens -- --strict`): every preset in both themes must pass the WCAG contrast audit (`tokens/contrast.ts`), and the chart palette must pass the categorical checks (`tokens/palette.ts`) on each preset's card surface: lightness band, chroma floor, and adjacent-pair separation under protanopia, deuteranopia (Machado et al. 2009) and normal vision. Low-contrast slots are warnings because ChartFrame's legend and table view relieve them.
2. **Lint** with warnings failing.
3. **Typecheck** and the **production build** (registry + site).
4. **Generated files are current**: `src/styles/tokens.css`, `registry.json` and `src/routeTree.gen.ts` must match what the build produces. If this fails, run `npm run build` and commit the result.

## Using it in an app

The docs site and registry are published at [detent-ui.com](https://detent-ui.com) (the registry is served from `/r`). In a consuming app:

```bash
npx shadcn@latest init -b base -p nova
npx shadcn@latest add https://detent-ui.com/r/theme.json
npx shadcn@latest add https://detent-ui.com/r/button.json
```

Each component depends on `theme`, so adding any component also pulls in the tokens and fonts.

### Deploying

Cloudflare builds `main` with `npm run build` and serves `dist/` per `wrangler.jsonc` (static assets, SPA fallback). Registry items reference each other by absolute URL, baked in at build time from `REGISTRY_URL` (default `https://detent-ui.com/r`). To try the registry against a local server, build with `REGISTRY_URL=http://localhost:5173/r` but don't commit the resulting `registry.json`.

## Adding a component

1. `yes n | npx shadcn@latest add <name>`. It lands in `src/components/ui`. Piping `n` declines overwriting components we've already restyled.
2. Restyle it with semantic tokens and `material-*` utilities only. Check the focus ring and use the radius roles (`rounded-lg` control, `rounded-xl` container, `rounded-2xl` overlay).
3. Write examples as real files in `src/examples/<name>/`: a `demo.tsx` hero, then one file per variant, size, state or composition. Each file default-exports a component and imports only from `@/components/ui` and `lucide-react`, because its source is shown verbatim in the Code tab.
4. Create `src/routes/components/<name>.tsx` (copy an existing page) using `ComponentDoc`, `Preview`, `Guidelines` and `Accessibility`, with sections in this order: hero → Variants → Sizes → States → composition → Guidelines → Accessibility. These are derived from the component source automatically: the primitive and material badges, the install command, the Usage import line, the `variant`/`size` props tables (parsed from its `cva` definitions), the Base UI docs link, and the exports. Pass `usage` for a snippet and `api` for props the source can't tell us.
5. Add it to `src/docs/nav.ts`. The route tree regenerates on save, and a nav entry pointing at a missing page fails the typecheck.
6. `npm run registry`. The item, its npm dependencies, sibling components and local hooks are all picked up from its imports.

## Licence

Detent is released under the [MIT licence](LICENSE). Its components are derived from [shadcn/ui](https://ui.shadcn.com) (MIT); see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
