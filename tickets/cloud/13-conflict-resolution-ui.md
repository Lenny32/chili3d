# CLOUD-13: Conflict Resolution UI

## Summary

When sync detects divergence: merge silently if clean, otherwise let the user resolve conflicts with context, then save a two-parent `merge` version.

## Flow

1. Diverged → fetch base + latest → merge → validate.
2. **Clean**: apply as one transaction, push, toast "Merged changes from *<device>*" with **View changes** / **Undo merge**.
3. **Conflicts**: non-modal panel grouped by body/node:
   - description, *This device* vs *<other device>* values (base on hover), **Keep this / Take other**, **Keep both** where meaningful;
   - selecting a row highlights the node / opens the feature in the timeline / selects the sketch entity;
   - live preview of the merged model with current choices (debounced re-evaluation);
   - bulk "Keep all from this device" / "Take all from other";
   - **Save as a copy instead** at any time.
4. All resolved + validation OK (or remaining rebuild errors explicitly accepted) → push `merge` version.
5. New remote update during resolution → re-merge, reapply choices by conflict path.

## Things to think about

- Conflicts are always between the same user's devices/agents → label sides by device name and time (local, CLOUD-08), and "Agent (MCP)" when the other side came from MCP.
- Rebuild-failure conflicts have no side to pick → "open failing feature", edit, re-validate.
- Autosave/sync paused while resolving.
- "Export merge report" (base/ours/theirs manifests as JSON) for bug reports.

## Acceptance criteria

- [ ] Clean divergence auto-merges; "Undo merge" restores the pre-merge local state.
- [ ] Every CLOUD-11 fixture is resolvable through the UI (component tests).
- [ ] Selecting a conflict highlights the affected object.
- [ ] Save-as-copy leaves the other version as head and creates a new document with mine.
- [ ] Remote update during resolution keeps chosen resolutions.

## Dependencies and complexity

Dependencies: CLOUD-10, CLOUD-12. Complexity: high.
