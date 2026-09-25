# CLOUD-10: Offline-First Sync

## Summary

Every save lands in IndexedDB first; a sync engine pushes to the server in the background, pulls updates from the user's other devices, and triggers the merge when histories diverge. Losing the LAN/server never loses work.

## Model (per cloud document, in IndexedDB)

```
syncRecord { docId, baseVersion, localSnapshot, localDirty, pendingKind: manual|auto,
             pendingSince, lastError, clientId }
versionCache { versionId → manifest }   // must retain baseVersion while dirty (merge base)
blobCache    { sha256 → blob }           // LRU, size-capped
```

States: `clean → dirty → pushing → clean` · `pushing → diverged (409) → merging → pushing` · `* → offline → pushing` · `* → error` (401 → re-login, 413/quota → user).

## Scope

- Push: `POST /api/blobs/check` → upload missing → `POST versions` with `If-Match: baseVersion`, `Idempotency-Key`.
- Pull: WebSocket `/ws/events` `document.updated {id, head, clientId}` (ignore own), plus refetch on reconnect / window focus. Clean → fast-forward in place (toast "Updated from *<device>*"). Dirty → diverged → merge (CLOUD-12/13).
- Backoff retry; queue survives reloads; `navigator.storage.persist()`.
- One sync owner per document per browser (Web Locks API); other tabs read-only.
- Several offline autosaves collapse into one pushed `auto` version; a pending manual save pushes as `manual`.
- In-place reload after pull: `document.replaceContent(serialized)` keeping views/camera, deferring while a command is active ("remote changes pending" pill).

## Acceptance criteria

- [ ] Stop the server, edit + save several times, restart → server has the changes with the correct parent; nothing lost.
- [ ] Reload while offline with pending changes → still there, pushed later.
- [ ] Update from device B appears on device A within ~2 s when A is clean.
- [ ] Diverged state enters the merge flow.
- [ ] Fault-injection test (flapping network) converges: server head == local base, local clean.

## Dependencies and complexity

Dependencies: CLOUD-06, SRV-05, SRV-07 (events). Merge path: CLOUD-12/13. Complexity: high.
