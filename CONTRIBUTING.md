# Contributing

Thanks for helping improve Pink Pixel Candy Themes. This repository is intentionally simple: it is a theme-only VS Code extension, so most contributions happen in `themes/*.json`, the extension manifest, or the documentation that explains and showcases the collection.

## What helps most

- Report UI surfaces that still fall back to stock VS Code colors.
- Suggest polish passes for contrast, syntax grouping, or terminal palettes.
- Refresh screenshots after visible theme changes so the Marketplace listing stays honest.
- Keep `README.md`, `OVERVIEW.md`, `CHANGELOG.md`, and `ROADMAP.md` in sync whenever the collection changes.

## Local workflow

1. Clone the repository and open it in VS Code.
2. Press `F5` to launch an Extension Development Host.
3. Run `npm run validate` after editing themes or manifest entries.
4. Run `npm run package` before release-oriented changes so the `.vsix` flow is verified locally.

## Theme editing guidelines

- Keep every theme file on the standard VS Code color theme schema.
- Preserve the Pink Pixel family look: candy-forward colors, strong neon accents, and intentionally dark editor surfaces.
- Keep semantic syntax roles consistent across themes when possible.
- Maintain comfortable contrast for normal themes and stronger contrast for the dedicated contrast-heavy variants.
- Check workbench chrome as carefully as editor syntax. Tabs, sidebars, activity bar, quick input, peek views, terminal ANSI colors, and debug status styling should feel intentional.

## Pull requests and issues

When opening an issue or pull request, include:

- The affected theme name.
- Your VS Code version and operating system.
- A short description of the surface that looks wrong or the improvement you are proposing.
- Screenshots when the change is visual.

If you are changing shipped theme behavior, please also note whether screenshots, roadmap items, and changelog entries were updated alongside the code.
