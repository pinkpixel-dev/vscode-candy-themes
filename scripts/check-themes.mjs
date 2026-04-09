import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const packageJsonPath = path.join(root, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const themes = packageJson.contributes?.themes ?? [];

if (!themes.length) {
  console.error("No themes were found in package.json.");
  process.exit(1);
}

const uiThemeByType = {
  dark: "vs-dark",
  light: "vs",
  hcblack: "hc-black",
  hclight: "hc-light"
};
const validUiThemes = new Set(["vs", "vs-dark", "hc-black", "hc-light"]);

let hasErrors = false;

for (const theme of themes) {
  const themePath = path.join(root, theme.path);

  if (!fs.existsSync(themePath)) {
    console.error(`Missing theme file: ${theme.path}`);
    hasErrors = true;
    continue;
  }

  let parsedTheme;

  try {
    parsedTheme = JSON.parse(fs.readFileSync(themePath, "utf8"));
  } catch (error) {
    console.error(`Invalid JSON in ${theme.path}: ${error.message}`);
    hasErrors = true;
    continue;
  }

  const typeKey = String(parsedTheme.type || "").toLowerCase();
  const expectedUiTheme = typeKey ? uiThemeByType[typeKey] : theme.uiTheme;

  if (!validUiThemes.has(theme.uiTheme)) {
    console.error(`Unsupported uiTheme "${theme.uiTheme}" in package.json for ${theme.label}.`);
    hasErrors = true;
  } else if (typeKey && !expectedUiTheme) {
    console.error(`Unsupported theme type "${parsedTheme.type}" in ${theme.path}.`);
    hasErrors = true;
  } else if (expectedUiTheme && theme.uiTheme !== expectedUiTheme) {
    console.error(
      `Theme ${theme.label} declares uiTheme "${theme.uiTheme}" but ${theme.path} is type "${parsedTheme.type}".`
    );
    hasErrors = true;
  }

  if (!Array.isArray(parsedTheme.tokenColors)) {
    console.error(`Theme ${theme.path} is missing a tokenColors array.`);
    hasErrors = true;
  }

  console.log(
    [
      `OK ${theme.label}`,
      `type=${parsedTheme.type ?? "<manifest-driven>"}`,
      `colors=${Object.keys(parsedTheme.colors || {}).length}`,
      `tokens=${Array.isArray(parsedTheme.tokenColors) ? parsedTheme.tokenColors.length : 0}`
    ].join(" | ")
  );
}

if (hasErrors) {
  process.exit(1);
}

console.log(`Validated ${themes.length} theme files.`);
