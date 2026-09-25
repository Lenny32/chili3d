# INSPECT-09: Isocurve Analysis

## Summary

Display surface U/V isocurves with optional curvature combs.

Status: planned. Priority: P2.

## Scope

- Expose guarded surface isocurve extraction/evaluation.
- Support U, V, or both directions with count/density controls and optional comb scale.
- Clip displayed curves to actual trimmed-face boundaries, including holes.
- Handle periodic seams and singular poles without duplicate or unbounded curves.

## Implementation Areas

packages/wasm/src/surface.ts, cpp/src/geometry.cpp, packages/three/src/.

## Acceptance Criteria

- [ ] Planar, cylindrical, and spline-surface fixtures show expected U/V curves.
- [ ] Curves remain inside trimmed domains and avoid holes.
- [ ] Optional combs reproduce known curvature values.
- [ ] Count changes, transformed faces, source edits, and lifecycle behavior are verified.
- [ ] Apply the shared implementation and verification requirements in the [Inspect roadmap](inspect-roadmap.md).

## Dependencies and Complexity

Dependencies: 00; 05 for curvature-comb overlay. Numbered dependencies refer to INSPECT tickets in the [roadmap](inspect-roadmap.md). Complexity: high.

