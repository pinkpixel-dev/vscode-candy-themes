# Overview

## Purpose

This repository packages Pink Pixel's original candy-forward Visual Studio Code theme collection as a theme-only extension. The extension contributes seven dark themes, including two contrast-heavy variants, and keeps the source of truth in plain JSON files under `themes/`. This refresh aligns the repository scaffold with the newer `vscode-sweet-themes` project so both collections now share the same documentation layout, packaging workflow, and Marketplace-facing structure.

With version `1.1.1`, the repo also standardizes local preview and packaging work: `README.md` now follows the same compact Marketplace-first format as the Sweet Themes collection, `ROADMAP.md` has been added for ongoing follow-up work, and the extension can be packaged consistently with `npm run package`.

## Architecture

- `package.json` is the VS Code extension manifest and declares all contributed themes.
- `.vscode/launch.json` adds a ready-to-run Extension Development Host profile for local previewing.
- `themes/*.json` stores each color theme definition.
- `scripts/check-themes.mjs` performs lightweight validation so theme packaging errors are caught before creating a `.vsix`.
- `.vscodeignore` keeps dev-only files out of the packaged extension, including local Codex instructions, the checked-in launch profile, archived source folders under `other/`, and README-only marketing assets such as `logo.png` and `screenshots/**`.
- `icon.png` is registered in `package.json` as the Marketplace extension icon.

## Theme inventory

- Pink Pixel Candy Nebula
- Pink Pixel Cloudwerx Lab
- Pink Pixel Electric Sugarstorm
- Pink Pixel Hyper Noir Contrast
- Pink Pixel Neon Lagoon
- Pink Pixel Photon Storm Contrast
- Pink Pixel Voltage Velvet

## Current design notes

Candy Nebula remains the softest entry point in the pack, leaning into a dreamy magenta-purple backdrop with mint and sky highlights for a cosmic candy feel.

Cloudwerx Lab gives the collection a calmer counterweight with charcoal workbench chrome and powder-blue UI accents that feel cleaner and more restrained than the neon-forward themes.

Electric Sugarstorm and Voltage Velvet carry the loudest candy-rave energy, using hot magenta, lime, and cyan accents to keep syntax and interface framing sharp even on very dark editor surfaces.

Hyper Noir Contrast and Photon Storm Contrast are still contributed as `vs-dark` themes rather than separate high-contrast entries, matching the pattern used in the newer Sweet Themes pack so they appear in the standard dark-theme picker list while still delivering accessibility-oriented contrast.

## Local preview workflow

Pressing `F5` uses the checked-in extension host launch profile, so the repo can be previewed directly in VS Code without packaging a `.vsix` first.

For packaging work, `npm run validate` checks every contributed theme file against the manifest, and `npm run package` runs that validation step before invoking `npx @vscode/vsce package`.

## Note on the old demo `tsconfig.json`

There is no active root-level `tsconfig.json` or `jsconfig.json` in this repository anymore. The lingering "demo" references come from archived source folders kept under `other/`, including an old `other/horizon-extended-master/demo` subtree and nested `.vscode` folders from older theme repos. Those folders are now explicitly excluded from the packaged extension via `.vscodeignore`, so they will not ship in the `.vsix`.

If VS Code still surfaces that old demo path during editing, it is likely discovering files from those archived folders inside the workspace rather than from the actual extension scaffold. Moving the archived folders out of the workspace or deleting them later would be the cleanest way to silence that noise entirely.
