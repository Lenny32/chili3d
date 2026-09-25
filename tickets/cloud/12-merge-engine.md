# CLOUD-12: Merge Engine

## Summary

Implement CLOUD-11 as a pure function over serialized documents (browser + Node tests), plus the WASM validation pass. Client-only.

## API (`packages/core/src/merge/`)

```ts
export function diffDocuments(base: Serialized, next: Serialized): Change[];   // also used by history compare
export function mergeDocuments(base: Serialized, ours: Serialized, theirs: Serialized,
                               rules: MergeRuleRegistry): MergeResult;          // { merged, conflicts, changes }
export function applyResolutions(result: MergeResult, choices: Resolution[]): Result<Serialized>;
```

- Rule registry mirrors serialization registration; modules register their classes (parametric, sketch). Unknown classes → whole-node atomic 3-way.
- Inputs migrated to current format first; blobs compared by hash.
- Deterministic output and conflict order.

## Validation pass

1. Load merged document without views (null visual).
2. Evaluate bodies; compare per-feature status with ours/theirs.
3. Resolve references; add `dangling-ref` / `rebuild-failure`.

## Things to think about

- O(n) maps by id; patience diff for long sibling lists (big imported assemblies).
- Inputs never mutated (deep-freeze in tests).
- Merge applied as one undoable transaction before pushing.
- Progress + cancel for slow re-evaluation.

## Acceptance criteria

- [ ] All CLOUD-11 fixtures pass.
- [ ] Property tests (fast-check): `merge(b, x, b) = x`, `merge(b, b, y) = y`, `merge(b, x, x) = x` without conflicts.
- [ ] Every serializable class has a rule or the explicit atomic fallback.
- [ ] Validation reports only merge-introduced failures.

## Dependencies and complexity

Dependencies: CLOUD-11. Complexity: high.
