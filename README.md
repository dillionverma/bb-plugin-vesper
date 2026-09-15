# Vesper

Peppermint and orange for BB. A port of Rauno Freiberg’s Vesper theme.

A plugin for [BB](https://getbb.app).

## Highlights

- **App palette.** Canvas, text, accents, surfaces, and terminal colors.
- **Code palette.** Vesper syntax highlighting in source and diff views.
- **Light companion.** An inverted app palette paired with GitHub Light code highlighting.

## Install

```sh
bb plugin install https://github.com/dillionverma/bb-plugin-vesper
```

Requires BB 0.43+ and a compatible Plugin SDK (see `package.json`).

## Use

Run `bb theme set plugin:vesper:vesper`, or select **Vesper** under Settings → Appearance.

## Designed to stay responsive

A declarative theme: no background polling, agent calls, or external service.

## Development

```sh
npm ci
npm run typecheck
bb plugin build .
```

Focused fixes and reproducible bug reports are welcome. Include BB version, platform, and steps to reproduce.

## Compatibility

The repository and display name are independent of BB’s persistent plugin identity. The internal ID remains `vesper` so existing settings, stored data, CLI commands, and integrations continue to work.

## The Ultra suite

Built for getting work done across multiple threads, agents, and projects. Install only the pieces you need.

- [Ultra Sidebar](https://github.com/dillionverma/bb-plugin-ultra-sidebar) — Organize parallel work.
- [Ultra Launcher](https://github.com/dillionverma/bb-plugin-ultra-launcher) — Start the next run.
- [Ultra Topbar](https://github.com/dillionverma/bb-plugin-ultra-topbar) — Turn threads into pull requests.
- [Linear Panel](https://github.com/dillionverma/bb-plugin-linear-panel) — Keep issues beside execution.
- [Usage Window](https://github.com/dillionverma/bb-plugin-usage-window) — Keep account capacity in view.

## Credits

[Vesper](https://github.com/raunofreiberg/vesper) by Rauno Freiberg, with palette references from [vladzima/vesper-theme](https://github.com/vladzima/vesper-theme).

## License

MIT. See [LICENSE](LICENSE).
