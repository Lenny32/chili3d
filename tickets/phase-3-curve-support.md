# Phase 3: Curve Support (Spline/Bezier)

## Summary
Introduce spline and Bezier curve creation as **geometry-only entities** (not parametrically constrained). PlaneGCS v1.2.0 does not support curve constraints, so curves are stored as fixed interpolated geometry and constrained only at endpoints/tangent points.

**⚠️ Critical Finding:** [Full research report](PHASE-3-RESEARCH.md)

## Scope

### Spline Tool (Interpolating Curve)
- Create curve through series of picked points (endpoints and intermediate points)
- Curve interpolates all picked points (passes through them)
- Open splines only (closed loops deferred)
- Client-side computation (not solver-driven)
- Render as smooth mesh

### Bezier Tool (Approximating Curve)
- **Deferred to future phase** (lower priority than splines)

### Edit Points on Curve (Deferred)
- Client-side control point editing (not solver-driven, no constraints)
- May be added as Phase 3.x enhancement

### Endpoint Constraints
- Endpoints are concrete points; can be constrained (coincident, distance, angle)
- Intermediate control points are **fixed** (not independent DoF)
- Tangent constraints at endpoints (if tracked)

## Implementation Details

### Files to Create
- `packages/parametric/src/sketch/commands/sketchSpline.ts`
- `packages/parametric/src/sketch/commands/sketchBezier.ts`
- `packages/parametric/src/sketch/commands/sketchEditCurve.ts`
- `packages/parametric/src/sketch/solverEntities/splineEntity.ts`

### Files to Modify
- `packages/parametric/src/sketch/sketchModel.ts` — add spline/Bezier entity types
- `packages/parametric/src/sketch/solver.ts` — spline constraint support
- `packages/parametric/src/sketch/editor/sketchAnnotations.ts` — curve visualization
- `packages/parametric/src/sketch/planegcs.ts` — solver bindings (if PlaneGCS supports curves)
- `packages/parametric/src/sketch/ribbon.ts` — add to Create group

### Solver Support Decision (Resolved)
✅ **Research Complete:** [PHASE-3-RESEARCH.md](PHASE-3-RESEARCH.md)

**Result:** PlaneGCS v1.2.0 **does NOT support spline/conic constraints**.

- No `.addSpline()`, `.addEllipse()`, or `.addConic()` API
- Only Point, Line, Circle, Arc types are supported
- Ellipse in sketchModel.ts is a type stub with no solver bindings

**Implementation:** Curves are **geometry-only entities**
- Spline params: interpolated point array (stored as mesh or Catmull-Rom control points)
- Endpoints are pinned in sketch (fixed by solver as external geometry)
- Constraints work on endpoints only (coincident, distance, angle, tangent)
- Shape recomputation is client-side (no solver involvement)

## Acceptance Criteria
- [ ] Spline tool creates open interpolating curves through picked points
- [ ] Curves render smoothly in viewport (mesh-based, not arc approximation)
- [ ] Spline endpoints are concrete points (can be dragged, constrained)
- [ ] Endpoints can be constrained (coincident, distance, angle)
- [ ] Tangent constraints work at curve endpoints (if tangent vectors tracked)
- [ ] Spline shape is recomputed client-side when endpoint moves
- [ ] Spline survives solver (treated as external geometry, endpoints pinned)
- [ ] Serialization/deserialization preserves spline control points
- [ ] Unit tests for curve creation and endpoint constraint solving
- [ ] No regressions in existing geometry or solver

## Dependencies
- Phase 1 (foundation for UI patterns)
- Phase 2 (trim/extend should work on curves)
- PlaneGCS documentation/testing (solver capability)

## Complexity Estimate
**High** — Spline math and solver integration are substantial. Potential solver limitations could require workarounds.

## Related Files
- `packages/parametric/src/sketch/planegcs.ts` — solver wrapper
- `packages/parametric/src/sketch/solverEntities.ts` — entity binding pattern
- `packages/parametric/src/sketch/commands/sketchArc.ts` — curved entity reference
- `packages/wasm/cpp/src/` — may need C++ curve support

## Investigation Tasks (Completed)
- [x] Review PlaneGCS documentation for conic/spline support → **Not supported**
- [x] Confirm solver limitation → **Geometry-only approach required**
- [x] Document findings → See [PHASE-3-RESEARCH.md](PHASE-3-RESEARCH.md)

## Pre-Implementation Decisions Needed
1. [ ] Spline interpolation method: Catmull-Rom, B-spline, or custom?
2. [ ] Spline parameter storage: control points array, or tessellated mesh?
3. [ ] Endpoint tangent tracking: yes (for tangent constraints) or no?
4. [ ] Closed spline support: defer to Phase 3.x or include?

## Notes
- **Curves are not parametrically editable via solver.** User expectation management needed.
- Splines render as smooth mesh (not arc approximations for better visual quality)
- Mesh export must tessellate curves
- Future: if PlaneGCS 2.x adds curve support, we can retrofit parametric DoF (upgrade path)
- Bezier deferred (splines cover 80% of use cases; approximate Bezier as spline)
