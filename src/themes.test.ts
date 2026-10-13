import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { posix } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";

interface Theme {
  id: string;
  css: string;
  codeTheme: { dark: string; light: string };
}

const root = new URL("../", import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), "utf8");
const manifest: { bb: { server: string; skills: string[]; themes: Theme[] } } =
  JSON.parse(read("package.json"));
const { themes } = manifest.bb;

const tokensToSet = [
  "--canvas",
  "--ink",
  "--primary",
  "--primary-foreground",
  "--muted-foreground",
  "--subtle-foreground",
  "--readback-foreground",
  "--destructive",
  "--destructive-text",
  "--warning",
  "--warning-text",
  "--attention",
  "--success",
  "--diff-added",
  "--diff-removed",
  "--pr-merged",
  "--file-accent",
];

// BB toggles only a `dark` class on <html>, so `.light` rules never reach the root.
const rootSelectors = { light: [":root"], dark: [":root", ".dark"] };

function resolvedTokens(cssPath: string, mode: "light" | "dark") {
  const css = read(cssPath).replace(/\/\*[\s\S]*?\*\//g, "");
  const values: Record<string, string> = {};
  for (const [, selectors, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selectorList = selectors.split(",").map((s) => s.trim());
    if (!rootSelectors[mode].some((selector) => selectorList.includes(selector))) continue;
    for (const [, name, value] of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      values[name] = value.trim();
    }
  }
  return values;
}

// Mirrors BB's isCodeThemeFilePath; any other codeTheme value names a bundled theme.
const codeThemeFiles = [
  ...new Set(themes.flatMap((theme) => [theme.codeTheme.dark, theme.codeTheme.light])),
].filter((ref) => ref.includes("/") || ref.toLowerCase().endsWith(".json"));

test("the package ships every file the manifest names, plus the license", () => {
  const [pack] = JSON.parse(
    execFileSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
      cwd: fileURLToPath(root),
      encoding: "utf8",
      shell: process.platform === "win32",
    }),
  );
  const shipped = new Set(pack.files.map((file: { path: string }) => file.path));
  const skillFiles = manifest.bb.skills.flatMap((dir) =>
    readdirSync(new URL(`${dir}/`, root), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => `${dir}/${entry.name}/SKILL.md`),
  );
  const needed = [
    manifest.bb.server,
    ...themes.map((theme) => theme.css),
    ...codeThemeFiles,
    ...skillFiles,
    "LICENSE",
  ].map((path) => posix.normalize(path));
  expect(needed.filter((path) => !shipped.has(path))).toEqual([]);
});

test.each(codeThemeFiles)("%s is a VS Code theme BB can load", (path) => {
  const theme = JSON.parse(read(path));
  expect(theme.name).toMatch(/\S/);
  expect(["dark", "light"]).toContain(theme.type);
  expect(theme.colors).toBeTypeOf("object");
  expect(theme.tokenColors).toBeInstanceOf(Array);
});

test.each([
  ["vesper-dark", "dark"],
  ["vesper-light", "light"],
] as const)("%s shows Vesper's %s palette in both app modes", (id, mode) => {
  const byId = Object.fromEntries(themes.map((theme) => [theme.id, theme]));
  const forced = byId[id];
  const follow = byId.vesper;
  // BB switches color-scheme and shadows only with its .dark class, so a forced
  // palette must carry its mode's own, on top of Vesper's palette for that mode.
  for (const appMode of ["light", "dark"] as const) {
    const tokens = resolvedTokens(forced.css, appMode);
    const palette = Object.fromEntries(Object.entries(tokens).filter(([name]) => !name.startsWith("--shadow")));
    expect(palette).toEqual(resolvedTokens(follow.css, mode));
    expect(tokens["--shadow-md"]).toBeDefined();
  }
  expect(read(forced.css)).toMatch(new RegExp(`color-scheme:\\s*${mode};`));
  expect(forced.codeTheme).toEqual({
    dark: follow.codeTheme[mode],
    light: follow.codeTheme[mode],
  });
});

describe.each(themes)("$id", ({ css }) => {
  test.each(["light", "dark"] as const)("sets every token BB expects of a palette in %s mode", (mode) => {
    const values = resolvedTokens(css, mode);
    expect(tokensToSet.filter((token) => !(token in values))).toEqual([]);
    const ansiWithoutText = Object.keys(values).filter(
      (token) => /^--ansi-\d+$/.test(token) && !(token.replace("ansi-", "ansi-bg-fg-") in values),
    );
    expect(ansiWithoutText).toEqual([]);
  });
});
