# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Detent is a shadcn-based design system on Base UI primitives, distributed as a **shadcn registry** (`public/r/*.json`, namespace `detent`) and documented by a Vite + React docs site in the same repo. There is no npm package and no unit-test suite; correctness is enforced by the token build's audits, lint, typecheck and the production build.

## Commands

Node 24 is required (`.nvmrc`): `scripts/` and `tokens/` are TypeScript run directly by Node, so their imports use explicit `.ts` extensions.

```bash
npm run dev                 # docs site at http://localhost:5173
npm run tokens              # regenerate src/styles/tokens.css + registry.json (contrast problems only warn)
npm run tokens -- --strict  # fail on contrast/chart-palette problems in ANY preset (what CI runs)
npm run check               # strict tokens + lint + typecheck — mirrors CI
npm run build               # tokens → shadcn build (public/r) → tsc -b → vite build
npm run lint                # oxlint --deny-warnings (warnings fail)
npx oxlint src/path/file.tsx  # lint one file
```

After a dependency is added while the dev server runs, restart it with `npx vite --port 5173 --force`; otherwise each newly visited page triggers a re-optimise-and-reload.

CI (`.github/workflows/ci.yml`, job **Verify**) runs strict tokens, lint, typecheck, build, then `git diff --exit-code` on the generated files `src/styles/tokens.css`, `registry.json` and `src/routeTree.gen.ts`. **Commit generated files** after `npm run build`. `main` is protected: changes go through a PR and Verify must pass.

## Architecture

### Tokens are generated, never hand-written
`tokens/tokens.ts` is the single source of truth. A small `Brand` object (accent, neutral tint, type, shape, elevation, overlays, labels, density) goes through `createTokens()`, which returns:
- `root`: brand-wide variables (fonts, radius roles, elevation, label voice, `--spacing` density, `--motion-*`)
- `light` / `dark`: semantic colours. Both must have identical keys; the build fails otherwise.
- `effects.light` / `effects.dark`: material variables (`--mat-*`), kept out of the colour mapping
- `theme`: the Tailwind `@theme inline` mappings

`brand = PRESETS.detent` is what gets compiled. The other presets (baseline, instrument, graphite, field) exist for the Direction explorer and are all audited in strict mode. `MOTION` (durations and easings) and `CHART` (the fixed categorical palette) are exported constants that the docs read as well.

`scripts/build-tokens.ts` writes `src/styles/tokens.css` and `registry.json`. Registry items are inferred from each `src/components/ui/*.tsx` file's imports: npm deps, sibling components, and `@/hooks/*` files shipped as `registry:hook`. Every component depends on the `theme` item.

`@theme inline` inlines values into utilities, so anything that must change at runtime (the explorer, scoped preset previews) has to be a `:root` variable that the theme entry references (e.g. `radius-lg: var(--radius-control)`). Don't put runtime-varying literals directly in `theme`.

### Audits (`tokens/contrast.ts`, `tokens/palette.ts`)
- `PAIRS` lists every foreground/background pairing components actually render. Add a pair when a component introduces a new one. Translucent (glass) surfaces are composited over `background` before measuring.
- `validatePalette` checks the categorical chart palette: lightness band, chroma floor, adjacent-pair OKLab ΔE under Machado-2009 protan/deutan and normal vision. Contrast below 3:1 is a warning, relieved by ChartFrame's legend + table view.
- Chart colours are a **fixed order** (`CHART`), deliberately not derived from the accent. Assign series to `chart-1`, `chart-2`… in order.

### Materials, not hard-coded fills or shadows
Components style depth through `material-*` utilities defined in `tokens/tokens.ts` (`utilities`), whose values come from `createEffects()` per elevation mode (flat / soft / tactile):
`raised` (object on the surface), `solid` (glossy colour fill), `recessed` (bordered well: inputs), `track` (borderless trough: slider/progress tracks, tab trays, skeletons), `latched` (toggle that is on), `knob`, `tint` (jelly tint from `currentColor`, scaled by `--tint-strength`), `highlight` (highlighted menu/list row), `lift` (`<Card interactive>`), `overlay` (glass blur + edge highlight for floating layers).

Conventions these encode:
- **Raised means selected; pushed in means on.** The segmented control's active item is raised; a pressed Toggle is latched.
- `material-recessed` is transparent in flat/soft brands, so it is only for bordered elements. Use `material-track` for anything borderless.
- Materials write into Tailwind's shadow stack (`--tw-shadow`), so `ring-*` focus styles compose with them. Hover/press live in nested selectors; `data-preview="hover" | "active"` pins a state for docs specimens.
- Radius roles: `rounded-lg` control, `rounded-xl` container, `rounded-2xl` overlay, `rounded-4xl` badge. `--radius` is aliased to the control radius for shadcn code that uses it.
- Colour roles: red **text** uses `text-destructive-subtle-foreground` (`destructive` is the fill and fails as text in dark mode); links use `text-primary-subtle-foreground`.

### Docs site
- File-based routes in `src/routes/**` (TanStack Router; `src/routeTree.gen.ts` is generated). Navigation lives in `src/docs/nav.ts`, whose `to` paths are typed against the route tree, so a link to a missing page fails the typecheck.
- Component pages use `ComponentDoc` (`src/docs/component-doc.tsx`). It reads the component's own source (via `import.meta.glob` `?raw`) to derive the Base UI / library badges, material badges, the Usage import line, the `variant`/`size` prop tables (parsed from `cva` definitions by `parseVariants`) and the exports list. Hand-written props go in its `api` prop; snippets in `usage`.
- Examples are real files in `src/examples/<component>/<name>.tsx`. `Preview` (`src/docs/preview.tsx`) renders one lazily and shows its exact source in a Code tab, so examples must import only from `@/components/ui` and libraries, never from `@/docs`.
- `src/explorer/` is the live Direction panel: it injects regenerated token CSS for an edited brand, and `brandStyle()` scopes a preset's variables to a subtree for previews.

## Adding or changing a component

1. `yes n | npx shadcn@latest add <name>`. Piping `n` declines overwriting the components already restyled.
2. Restyle with semantic tokens and `material-*` only: normalise focus to `focus-visible:ring-1 focus-visible:ring-ring` (+ `border-ring`), use `ring-border` for hairlines, and put floating layers on `material-overlay` with the container/overlay radius.
3. Add examples in `src/examples/<name>/` (`demo.tsx` is the hero), a page in `src/routes/components/<name>.tsx` using `ComponentDoc`/`Preview`/`Guidelines`/`Accessibility`, and an entry in `src/docs/nav.ts`.
4. `npm run build` and commit the regenerated files.

Keep code, comments and docs free of references to other design systems as sources of inspiration; that was cleaned up deliberately for the public release. shadcn/ui is credited in `THIRD_PARTY_NOTICES.md` as its MIT licence requires.

## Gotchas

- `cn` (the `cn` package) merges conflicting Tailwind classes. A custom utility named like a built-in group (e.g. `text-*`) gets merged away, which is why the label utility is `eyebrow`. Two classes setting the same property at the same variant depth have no guaranteed order: scope one with `not-*` variants or use `!`.
- Base UI: triggers compose with the `render` prop, not `asChild`. `Select` needs `items` to show labels instead of raw values. A `Button` rendered as a link needs `nativeButton={false}`. Tabs and menus activate on pointerdown, so a scripted `.click()` alone won't open them.
- TanStack Table is **v9**: features and row models are declared with `tableFeatures()`, sort/filter functions must be registered individually, and column definitions must be stable between renders (`useMemo` or module scope).
- In the browser pane, a hidden page freezes CSS transitions at t=0, so screenshots can look stale. Finish animations (`document.getAnimations().forEach(a => a.finish())`) or read computed styles.
