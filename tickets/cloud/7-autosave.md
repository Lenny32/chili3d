# CLOUD-07: Autosave

## Summary

Automatically save dirty documents every **5 minutes** by default. The interval is configurable; when signed in it is stored in the user's settings on the server (follows the user across devices), otherwise in local storage. Autosaves create versions of kind `auto`, which the server prunes; manual saves are kept forever.

## Scope

- `AutosaveService` in `packages/app`: timer per open document; fires only when `document.isDirty`.
- Never interrupt the user: skip/defer while a command is active (sketch editing, drag, gizmo, dialogs mid-operation) and while a merge is being resolved; run as soon as the command ends.
- Setting `autosave.intervalMinutes`: options Off, 1, 2, 5 (default), 10, 15, 30. Stored:
  - signed in → `PUT /api/me/settings` (SRV-06), cached locally for offline start;
  - signed out → `localStorage` `spicy3d.settings.autosave`.
  - On sign-in, the server value wins; if none exists yet, upload the local value.
- Targets:
  - cloud document → version with `kind: "auto"`;
  - local document → overwrite the local IndexedDB copy (there is no local history);
  - opened `.spicy` file via File System Access handle → write back only if the user enabled it for that file.
- Status bar: "Autosaved 14:05" (local time).
- Manual save (Ctrl+S) always creates a `manual` version, even if nothing changed since the last autosave (it "promotes" the state to a kept version).

## Things to think about

- Offline: autosave writes to the local cache; sync (CLOUD-10) pushes later — possibly several autosaves collapse into one pushed version.
- Autosave + conflict: an autosave hitting `409` enters the normal merge flow silently when clean; if conflicts arise, show the conflict pill, do not pop a modal.
- Timer reset after any manual save.
- Retention of autosaves is server policy (SRV-06); the history view (CLOUD-09) shows them collapsed.

## Acceptance criteria

- [ ] Dirty document is saved at the configured interval; clean document is not.
- [ ] No autosave fires mid-command; it fires right after the command ends.
- [ ] Interval changed on device A applies on device B after sign-in / settings refresh.
- [ ] Signed-out interval persists locally across reloads.
- [ ] Cloud autosaves appear as `auto` versions; manual saves as `manual`.

## Dependencies and complexity

Dependencies: CLOUD-03, CLOUD-06, SRV-06. Complexity: medium.
