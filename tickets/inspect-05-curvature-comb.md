# INSPECT-05: Curvature Comb Analysis

## Summary

Visualize edge curvature and transitions with sampled curvature combs.

Status: planned. Priority: P2.

## Scope

- Add guarded curve derivative/curvature evaluation with documented parameterization and units.
- Select multiple body edges; adjust sample density and comb scale; display curvature magnitude and continuity diagnostics at shared endpoints.
- Handle straight, closed, trimmed, reversed, and degenerate edges explicitly.
- Keep sketch curvature display outside the initial scope and document that limitation.

## Implementation Areas

packages/core/src/geometry/, packages/wasm/src/curve.ts, cpp/src/geometry.cpp, packages/three/src/.

## Acceptance Criteria

- [ ] Lines produce zero curvature and circles produce reciprocal-radius curvature.
- [ ] Spline fixtures reveal known curvature changes; edge reversal does not change magnitudes.
- [ ] Endpoint continuity diagnostics distinguish positional, tangent, and curvature discontinuities.
- [ ] Sampling respects trimmed edges and transformed geometry; singularities are visibly marked.
- [ ] Controls, lifecycle, and cancellation follow INSPECT-00.
- [ ] Apply the shared implementation and verification requirements in the [Inspect roadmap](inspect-roadmap.md).

## Dependencies and Complexity

Dependencies: 00. Numbered dependencies refer to INSPECT tickets in the [roadmap](inspect-roadmap.md). Complexity: high.

