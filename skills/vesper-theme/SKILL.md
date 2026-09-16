---
name: vesper-theme
description: Activate or inspect the Vesper theme plugin (peppermint and orange dark palette by Rauno Freiberg).
---

# Vesper theme

This plugin contributes three selectable palettes to BB:

- `plugin:vesper:vesper` — follows the app's light/dark mode
- `plugin:vesper:vesper-dark` — always dark (the original Vesper)
- `plugin:vesper:vesper-light` — always light (derived inversion)

- Activate: `bb theme set plugin:vesper:vesper-dark`
- Inspect without activating: `bb theme show plugin:vesper:vesper-dark`
- Back to default: `bb theme reset`

Palette CSS lives in `themes/vesper.css` (both blocks), with
`themes/vesper-dark.css` and `themes/vesper-light.css` being the same blocks
forced onto every mode. Keep the three in sync when editing colors. Code
themes are `themes/vesper-code-dark.json` and `themes/vesper-code-light.json`
(the light one is derived from dark by mapping the palette). Run
`bb plugin reload vesper` to pick up changes. There are no settings, commands,
or UI slots.

Credit: Vesper by Rauno Freiberg (github.com/raunofreiberg/vesper, MIT).
