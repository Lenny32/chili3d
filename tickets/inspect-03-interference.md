# INSPECT-03: Interference Detection and Reporting

## Summary

Detect and report volumetric overlaps without running a model-changing Boolean Common command.

Status: planned. Priority: P1.

## Scope

- Select bodies or groups and evaluate unique candidate pairs; use bounding boxes only as a broad-phase filter.
- Compute exact intersection geometry and volume with guarded kernel operations; distinguish touching/coincident boundaries from positive-volume overlap.
- Show a selectable pair list, overlap volume, and highlighted overlap geometry with an explicit tolerance.
- Offer optional creation of overlap geometry as a separate undoable modeling action; analysis itself must not alter originals.
- Support cancellation and cleanup for large pair sets.

## Implementation Areas

packages/app/src/commands/boolean.ts, packages/core/src/shape/, packages/wasm/src/factory.ts, cpp/src/factory.cpp, packages/three/src/.

## Acceptance Criteria

- [ ] Disjoint, touching, and overlapping box fixtures produce distinct expected results.
- [ ] Rotated and nested transformed bodies produce correct overlap volumes.
- [ ] Selecting a result highlights its pair and overlap; source edits invalidate/recompute results.
- [ ] Original bodies and history remain unchanged by analysis; optional extraction is undoable.
- [ ] Invalid solids and cancelled jobs produce no stale results or leaked kernel objects.
- [ ] Apply the shared implementation and verification requirements in the [Inspect roadmap](inspect-roadmap.md).

## Dependencies and Complexity

Dependencies: 00. Numbered dependencies refer to INSPECT tickets in the [roadmap](inspect-roadmap.md). Complexity: high.

