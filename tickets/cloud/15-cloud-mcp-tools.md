# CLOUD-15: Cloud-Aware MCP Tools

## Summary

Let agents work with the user's cloud library, not just the document already open — still executed in the user's tab (no server-side engine).

## Tools

Answered by the **server** (SRV-09, no tab needed, only the token owner's documents):
- `spicy3d_list_documents { query? }` → id, name, updatedAt (UTC), size
- `spicy3d_document_history { id, limit? }`
- `spicy3d_list_tabs` / `spicy3d_select_tab`

Relayed to the **tab** (this ticket):
- `spicy3d_open_document { id, version? }` — opens in the bound tab (asks the user if the current document has unsaved changes; the agent gets "waiting for user" / "declined")
- `spicy3d_new_document { name }`
- `spicy3d_save { label? }` — manual save through sync, version tagged `mcp`; a conflict is shown **to the user**, the agent receives "conflict pending user resolution" (agents never resolve merges)
- existing modelling + `capture_screenshot` tools unchanged

## Scope

- Implement relayed tools in `packages/ai/src/tools/`, hidden in local-bridge mode when not signed in.
- Update `buildMcpInstructions()` and skills with the open → edit → screenshot → save workflow.
- `spicy3d://document` resource includes cloud metadata (id, head version, dirty, location).

## Acceptance criteria

- [ ] Agent lists documents, opens one, edits, captures a screenshot, saves with a label; history shows an `mcp` version.
- [ ] Server-side tools work with no tab open; relayed tools return a clear "open Spicy3D in your browser" error.
- [ ] Unsaved-changes prompt blocks `open_document` until the user answers.

## Dependencies and complexity

Dependencies: CLOUD-06, CLOUD-14, SRV-09. Complexity: medium.
