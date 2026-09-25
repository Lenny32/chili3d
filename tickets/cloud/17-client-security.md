# CLOUD-17: Client Security

## Summary

Once the app holds a session cookie to a server containing the user's documents (and later sits on the public internet), client-side weaknesses become account weaknesses. Review before going public.

## Checklist

- [ ] **CSP** served by the server's proxy (SRV-02/SRV-11): `default-src 'self'`, `script-src 'self' 'wasm-unsafe-eval'`, no inline scripts (check loading screen, `iconfont.js`), `connect-src 'self'` + configured LLM endpoints, `frame-ancestors 'none'`.
- [ ] **Plugins** (`?plugin=` and plugin manager) execute arbitrary code with the user's session → when signed in: same-origin/allowlisted plugins only, or an explicit trust prompt naming the origin.
- [ ] **`?url=` / `?model=`** loaders: same-origin/allowlist; never fetch arbitrary hosts silently.
- [ ] **CSRF**: every state-changing request carries the custom header required by the server (`X-Spicy3D-Request: 1`).
- [ ] **Tokens**: MCP personal access tokens shown once, never stored in localStorage; the old local-bridge token stays separate.
- [ ] **Sign-out hygiene**: cached cloud documents, blobs and settings removed from IndexedDB/localStorage (unless "keep offline copies").
- [ ] **MCP**: pairing prompt, agent indicator, disconnect (CLOUD-14); prompt-injection note in docs — document text (names, annotations) reaches the agent.
- [ ] **Dependencies**: `npm audit` in CI; pin and review the MCP SDK and generated API client deps.
- [ ] **Error handling**: no tokens or document content in logs/toasts/telemetry.

## Dependencies and complexity

Dependencies: CLOUD-05, CLOUD-14. Complexity: medium; repeat before each public release.
