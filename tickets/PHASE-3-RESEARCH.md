# Phase 3: Curve Support Research Report

**Date:** 2026-09-24  
**Status:** ⚠️ **CRITICAL BLOCKER IDENTIFIED**

## Summary

PlaneGCS **does NOT support splines, Bezier curves, or general conics**. Curves must be implemented as **geometry-only entities** with endpoint/tangent constraints. This significantly impacts Phase 3 scope.

---

## Findings

### 1. PlaneGCS Supported Entity Types

Current solver (v1.2.0 from `@salusoft89/planegcs`):

| Entity Type | Supported | Params | Constraints |
|-------------|-----------|--------|-------------|
| **Point** | ✅ Yes | 2 (x, y) | Coincident, Fix, PointOn(Line/Circle/Arc) |
| **Line** | ✅ Yes | 4 (p1.x, p1.y, p2.x, p2.y) | Horizontal, Vertical, Parallel, Perpendicular, Tangent* |
| **Circle** | ✅ Yes | 3 (cx, cy, radius) | Radius, PointOnCircle, Tangent*, Equal radius |
| **Arc** | ✅ Yes | 6 (cx, cy, sx, sy, ex, ey) | PointOnArc, Tangent*, EqualArcRadius |
| **Ellipse** | ⚠️ **Partially** | 3 params (undefined) | **NONE** (type stub only) |
| **Spline** | ❌ No | — | — |
| **Bezier** | ❌ No | — | — |
| **Generic Conic** | ❌ No | — | — |

**⚠️ Ellipse in sketchModel.ts is a type stub with no solver bindings.** It's defined in `SketchEntityType` and has 3-point layout, but no underlying PlaneGCS support.

### 2. PlaneGCS API Surface

From `planegcs.ts` import:
```typescript
import type { Circle, GcsSystem, Line, Point } from "@salusoft89/planegcs/dist/planegcs_dist/gcs_system";
```

**Only 4 entity type imports.** No ellipse, spline, or conic types exported.

PlaneGCS solver operations observed:
- `.addLine(x1, y1, x2, y2)` → Line handle
- `.addCircle(cx, cy, radius)` → Circle handle
- `.addArc(cx, cy, sx, sy, ex, ey)` → Arc handle
- `.addPoint(x, y)` → Point handle
- `.addConstraint(kind, params, internal?, datums?)` → Constraint ID
- `.solve()` / `.solve(coarse)` → SolveStatus
- No `.addSpline()`, `.addEllipse()`, `.addConic()` methods

### 3. Constraint Support

Current constraint kinds in `ConstraintKind` enum (27 total):
- **Point-point:** Coincident, P2PDistance, Midpoint, Symmetric, Fix
- **Point-line:** PointOnLine, P2LDistance, HorizontalAlign, VerticalAlign
- **Point-circle:** PointOnCircle
- **Point-arc:** PointOnArc
- **Line-line:** Horizontal, Vertical, Parallel, Perpendicular, Angle, EqualLength
- **Circle-circle:** EqualRadius, TangentCircleCircle
- **Arc-circle:** TangentCircleArc, EqualArcRadius
- **Arc-arc:** TangentArcArc, EqualArcRadius
- **Line-circle/arc:** TangentLineCircle, TangentLineArc
- **Generic:** Equal, Radius

**No constraints for ellipse, spline, or conic entities.**

### 4. Solver Introspection

PlaneGCS provides:
- `solve()` → `SolveStatus` (SUCCESS | CONVERGED | DIVERGED)
- `diagnosis()` → `SolverDiagnosis` { conflicting: number[], redundant: number[], dofs: number }

**Does have conflict/redundancy detection** → helpful for Phase 6 later.

---

## Impact on Phase 3

### Option A: Geometry-Only Splines (Recommended)

**Splines and Bezier are treated as fixed geometry, not parametric entities.**

```
Spline creation flow:
  1. User picks control points
  2. Compute spline interpolation (client-side)
  3. Store as mesh or approximation arcs
  4. Constrain by endpoints/tangents only
  
Result: No parametric spline control via solver
Trade-off: 80% of value, 20% complexity
```

**Constraints available:**
- Endpoint coincident/distance/angle (endpoints are part of the definition)
- Tangent constraints at endpoints (if we track endpoint tangents)
- NOT: modify spline shape via constraints (no intermediate control points)

**Implementation pattern:**
1. Define spline entity type in sketchModel (add to SketchEntityType)
2. Store spline as interpolated point array + metadata
3. Render as smooth mesh
4. In solver: treat spline as **external reference** (like projected edges)
   - Pin endpoints rigidly
   - Allow constraints on endpoints
   - Spline shape is static (never changes position, only translation/rotation via endpoint constraints)

### Option B: Parametric Splines (Requires Custom Solver)

Replace or extend PlaneGCS with a solver that supports spline DoF.

**Not feasible for Phase 3.** Would require:
- Custom C++ constraint solver
- Integration with OCCT or similar
- ~6-12 month effort

### Option C: Approximate Splines as Arc Chains

Tessellate spline into circular arcs, then constrain arcs.

**Trade-off:** Lossy (not smooth), complex DoF management, confusing UX.

Not recommended.

---

## Ellipse Status

**Type stub only. Already declared but never used.**

Ellipse params in sketchModel: `ellipse: 3` point count (likely center + major radius + minor radius, or center + two foci).

**Two paths forward:**

### Path 1: Approximate Ellipse as Arc Chain
- Tessellate into 4 or 8 arcs
- Constrain arcs together (equal radius per axis)
- Pros: Works with existing solver
- Cons: Not smooth, complex to edit

### Path 2: Treat Ellipse as Geometry-Only
- Store as 3 params (center + rx, ry or foci)
- Render as smooth mesh
- Constrain by center + major/minor axis points
- Pros: Clean, smooth, familiar to CAD users
- Cons: Not editable via constraint (like Option A splines)

**Recommendation:** Path 2 (geometry-only, like splines).

---

## Alternative: PlaneGCS 2.x or Fork

**@salusoft89/planegcs** is actively maintained. Check if v2.x or later adds curve support.

Current dependency: `"@salusoft89/planegcs": "1.2.0"`.

**Action:** Before committing to geometry-only workaround, check:
1. PlaneGCS GitHub releases (v2.0+)
2. Feature roadmap or issues
3. Possibility of upgrade without breaking changes

If PlaneGCS 2.x adds ellipse/spline support → upgrade and revisit Phase 3.

---

## Revised Phase 3 Scope

### Immediate (Post-Research Confirmation)

**Spline/Bezier:** Geometry-only implementation
- Creation tool: pick points → interpolate spline
- Editing: move endpoints, adjust tangent (if we support tangent handles)
- Constraints: endpoints only (coincident, distance, angle, tangent)
- Visualization: smooth mesh rendering
- No shape control via constraints

**Ellipse:** Geometry-only implementation (paired with spline)
- Creation: center + major axis point + minor axis point (3-point UI)
- Constraints: center point, major/minor axis endpoints
- Visualization: smooth ellipse curve
- No parametric DoF

### Optional Later

**Spline Editing (Enhanced):**
- Add/remove intermediate control points (local, not solver-driven)
- Dragging control point recomputes local spline chunk
- Would require client-side spline library (e.g., Catmull-Rom, B-spline)

**Arc-Based Fallback:**
- If smooth rendering is too expensive, tessellate to arc chains
- For now, skip (modern browsers handle dense meshes fine)

---

## Milestones

### Before Phase 3 Starts
- [ ] Confirm PlaneGCS v1.2.0 is endpoint (no v2.0 with curve support)
- [ ] Choose spline interpolation library (e.g., Catmull-Rom via nurbs.js, or custom)
- [ ] Design ellipse parameter layout (center + 2 axis points vs. center + rx, ry)
- [ ] Prototype spline mesh rendering

### During Phase 3
- [x] Adjust acceptance criteria to match geometry-only scope
- [x] Update Phase 3 ticket with revised expectations
- [ ] Implement spline and ellipse creation tools
- [ ] Implement endpoint constraint UI
- [ ] Add spline/ellipse to export/serialization
- [ ] Test curve rendering at various scales

### Post-Phase 3
- **Deferred Feature:** Parametric spline control (if PlaneGCS 2.x arrives or community demand is high)
- **Quick Win:** Spline editing via client-side control points (not solver-driven)

---

## Solver Feedback (Phase 6 Readiness)

PlaneGCS **does expose conflict/redundancy detection** via `diagnosis()`:
```typescript
interface SolverDiagnosis {
    conflicting: number[];      // constraint IDs in conflict
    redundant: number[];        // constraint IDs redundant
    dofs: number;               // degrees of freedom remaining
}
```

✅ **Phase 6 (Solver Feedback) is feasible.** PlaneGCS introspection API is sufficient.

---

## Questions for Team

1. **Spline Interpolation:** Use existing library (nurbs.js, etc.) or custom?
2. **Ellipse Priority:** Include in Phase 3 or defer to Phase 1?
3. **Spline Editing:** Defer indefinitely or plan for Phase 3.x (client-side control points)?
4. **User Expectations:** How to communicate that splines are not parametrically editable?

---

## References

- PlaneGCS: https://github.com/Salusoft89/planegcs (check releases)
- Current version: 1.2.0 (see `packages/parametric/package.json`)
- Solver types: `planegcs.ts` lines 1-150 (entity and constraint definitions)
- Entity types: `sketchModel.ts` line 27 (SketchEntityType union)
