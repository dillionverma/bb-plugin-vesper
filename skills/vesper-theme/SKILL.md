---
name: vesper-theme
description: Activate or inspect the Vesper theme plugin (peppermint and orange dark palette by Rauno Freiberg).
---

# Vesper theme

This plugin contributes one selectable palette to BB. Its id is
`plugin:vesper:vesper`.

- Activate: `bb theme set plugin:vesper:vesper`
- Inspect without activating: `bb theme show plugin:vesper:vesper`
- Back to default: `bb theme reset`

The palette CSS lives in `themes/vesper.css` and the code theme in
`themes/vesper-code-dark.json`. Edit those files, then run
`bb plugin reload vesper` to pick up changes. There are no settings, commands,
or UI slots.

Credit: Vesper by Rauno Freiberg (github.com/raunofreiberg/vesper, MIT).
