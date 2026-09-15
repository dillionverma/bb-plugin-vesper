// bb-plugin-vesper — headless theme plugin.
//
// Everything this plugin contributes is declared in package.json under
// `bb.themes` (the palette CSS + Vesper code theme). The server entry is
// required by the manifest contract but has nothing to register.
import type { BbPluginApi } from "@get-bb/plugin-sdk";

export default async function plugin(bb: BbPluginApi) {
  bb.log.info("vesper theme loaded — select it in Settings → Appearance or `bb theme set plugin:vesper:vesper`");
}
