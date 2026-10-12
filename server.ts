import type { BbPluginApi } from "@get-bb/plugin-sdk";

// BB's manifest schema requires bb.server, even for a plugin that registers nothing.
export default async function plugin(bb: BbPluginApi) {
  bb.log.info("vesper theme loaded — select it in Settings → Appearance or `bb theme set plugin:vesper:vesper`");
}
