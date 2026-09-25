# CLOUD-16: Deployment Readiness (LAN Now, Public Later)

## Summary

The web app must run unchanged on a LAN-only server today and a public server later. Remove hard-wired external URLs, make everything come from runtime config, and handle the browser's secure-context rules.

## Known items

| Item | Where | Fix |
|------|-------|-----|
| LLM defaults `api.anthropic.com` / `api.openai.com` | `packages/ai/src/settings.ts:29-43`, `packages/ai/src/llm/*` | Keep as defaults for users with internet; allow server-provided defaults via `/api/config` (e.g. an on-prem OpenAI-compatible endpoint); chat panel explains when the endpoint is unreachable. |
| Bridge download base baked at build time (`__MCP_BRIDGE_DOWNLOAD_URL__`, GitHub releases) | `scripts/build-mcp-bridge-binaries.mjs`, `packages/ai/src/mcp/panel.ts` | Server serves bridge binaries (`/downloads/mcp-bridge/`); download base from `/api/config` at runtime. |
| `npx --package=<site>/mcp/…tgz` | `scripts/pack-mcp-bridge.mjs` | `npx` fetches dependencies from the npm registry → fails without internet. Bundle dependencies or recommend the standalone binary on LAN. |
| Repo links in home/ribbon | `packages/ui/src/home/home.ts:158`, `packages/ui/src/ribbon/ribbon.ts:185` | New repo URL (CLOUD-01); harmless offline. |
| `?plugin=`, `?url=`, `?model=` | web entry | Same-origin or allowlist when cloud is enabled (CLOUD-17). |
| Fonts / icons | `public/fonts`, `public/iconfont.js` | Local already; verify no external `@import`. |

## Scope

- Web app built once, deployable anywhere: no server URL baked in; same-origin by default.
- Build output published as a versioned artifact/image consumed by the server repo's compose (SRV-02): e.g. GitHub Actions builds `spicy3d-web:<version>` (static files in a Caddy/nginx image) or a tarball of `dist/`.
- **Secure context**: `http://<lan-ip>` is not secure → `crypto.subtle`, Service Workers, Clipboard, File System Access unavailable. On startup, if `!window.isSecureContext` and not localhost, show a banner explaining HTTPS is required for some features; the server compose provides TLS (SRV-02).
- Smoke test in CI: headless Chromium with non-same-origin requests blocked → app loads, WASM initializes, local save/open works.
- Lint script `scripts/check-external-urls.mjs` with an allowlist.

## Acceptance criteria

- [ ] With internet blocked, the app from the LAN server loads and works (local + cloud) with no failed external request.
- [ ] MCP panel downloads/configs point only at the configured server.
- [ ] Insecure-context banner appears over plain HTTP on a LAN IP.
- [ ] Same build works on a public HTTPS host without rebuild.

## Dependencies and complexity

Dependencies: CLOUD-01, CLOUD-04. Complexity: medium.
