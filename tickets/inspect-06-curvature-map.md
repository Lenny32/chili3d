# INSPECT-06: Curvature Map Analysis

## Summary

Color selected surfaces by Gaussian or principal curvature.

Status: planned. Priority: P2.

## Scope

- Expose guarded principal-curvature queries and define normal/sign conventions.
- Offer Gaussian, minimum principal, and maximum principal modes with editable ranges and a legend including units.
- Map samples to rendered trimmed faces; identify undefined/singular regions separately.
- Define sampling accuracy and cache invalidation; avoid assuming mesh vertex curvature equals exact surface curvature.

## Implementation Areas

packages/wasm/src/surface.ts, packages/core/src/geometry/, cpp/src/geometry.cpp, packages/three/src/.

## Acceptance Criteria

- [ ] Plane, sphere, cylinder, and saddle fixtures match analytic curvature expectations.
- [ ] Changing mode or range updates both legend and colors.
- [ ] Face orientation, seams, trims, and singularities have deterministic handling.
- [ ] Source edits invalidate results; hiding restores original appearance.
- [ ] Apply the shared implementation and verification requirements in the [Inspect roadmap](inspect-roadmap.md).

## Dependencies and Complexity

Dependencies: 00. Numbered dependencies refer to INSPECT tickets in the [roadmap](inspect-roadmap.md). Complexity: high.

