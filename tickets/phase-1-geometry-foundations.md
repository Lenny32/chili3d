# Phase 1: Geometry Foundations

## Summary
Add Polygon and Ellipse geometry creation tools to expand base sketch capabilities.

## Scope

### Polygon Tool
- Create regular polygons (3-N sides)
- Options: inscribed vs circumscribed (relative to construction circle)
- Input: center point + radius + number of sides
- Auto-constraint: center, all edges equal length, radius constraint available

### Ellipse Tool
- Create ellipses from center + major/minor radii or two focal points
- Input methods: center + point on ellipse, or two foci + point
- Auto-constraint: center, major/minor axis constraints available

### Point Creation Tool
- Create standalone points (construction or reference)
- Pick location or enter coordinates
- Useful for complex constraint relationships

## Implementation Details

### Files to Create
- `packages/parametric/src/sketch/commands/sketchPolygon.ts`
- `packages/parametric/src/sketch/commands/sketchEllipse.ts`
- `packages/parametric/src/sketch/commands/sketchPoint.ts`

### Files to Modify
- `packages/parametric/src/sketch/ribbon.ts` — add to Create group
- `packages/parametric/src/sketch/sketchModel.ts` — add entity types if needed
- `packages/parametric/src/sketch/solverEntities.ts` — add solver bindings
- `packages/parametric/src/sketch/editor/sketchAnnotations.ts` — add visualization

### Solver Extensions Needed
- Polygon constraint support (equal edge lengths via PlaneGCS)
- Ellipse curve representation (check if PlaneGCS supports conics)
- If PlaneGCS doesn't support ellipses, fallback to spline approximation

## Acceptance Criteria
- [ ] Polygon tool creates regular polygons with configurable sides
- [ ] Ellipse tool creates ellipses (exact or approximated)
- [ ] Point tool creates standalone constraint anchor points
- [ ] All three tools appear in Sketch ribbon Create group
- [ ] Tools integrate with existing constraint system
- [ ] Unit tests for entity creation and solver binding
- [ ] No regressions in existing line/circle/arc/rectangle tools

## Dependencies
- Existing: Line, Circle, Arc, Rectangle (reference implementations)
- Solver: PlaneGCS conic support (research needed)

## Complexity Estimate
**Medium** — Polygon/Point are straightforward; Ellipse depends on solver capability.

## Related Files
- `packages/parametric/src/sketch/commands/sketchLine.ts` — reference
- `packages/parametric/src/sketch/commands/sketchCircle.ts` — reference
- `packages/parametric/src/sketch/solverEntities.ts` — entity registration
- `packages/parametric/src/sketch/planegcs.ts` — solver interface

## Notes
- Test with auto-constraints to ensure polygon edge equality resolves correctly
- Ellipse may require spline fallback if PlaneGCS is limited to lines/circles
- Consider UI for side count input (spinner or preset options)
