# Phase 5: Constraint Enhancements

## Summary
Add advanced constraint types and improve constraint system feedback.

## Scope

### Collinear Constraint
- Constrain multiple points or lines to lie on the same line
- Useful for alignment without specifying exact line geometry
- Works across multiple entities

### Block Constraint
- "Lock" selected entities in place (all degrees of freedom)
- Replaces multiple fix constraints in one operation
- Visual indicator showing blocked entities

### Construction Geometry Constraint
- Toggle entities between construction (light/dashed) and reference modes
- Construction geometry doesn't contribute to final shape
- Useful for auxiliary geometry and guides

### Equal Angle Constraint
- Constrain multiple angles to be equal
- Useful for regular patterns (equal-spaced lines, etc.)

### Scale Constraint
- Proportional relationship between two distances
- Scale factor: user-entered value or expression
- Useful for similar shapes at different scales

## Implementation Details

### Files to Create
- `packages/parametric/src/sketch/commands/sketchConstraints.ts` — extend existing file
  - `CollinearConstraintCommand`
  - `BlockConstraintCommand`
  - `ConstructionConstraintCommand`
  - `EqualAngleConstraintCommand`
  - `ScaleConstraintCommand`

### Files to Modify
- `packages/parametric/src/sketch/ribbon.ts` — add constraints to Constraint group
- `packages/parametric/src/sketch/sketchModel.ts` — add `ConstraintKind` enum entries
- `packages/parametric/src/sketch/solverEntities.ts` — entity-to-constraint mapping
- `packages/parametric/src/sketch/editor/sketchAnnotations.ts` — visual indicators

### Solver Extensions Needed
- Collinear: check if PlaneGCS supports (may need line alignment formula)
- Block: apply all DoF fixes simultaneously
- Construction: tag for rendering, not constraint-level
- Equal Angle: reference multiple angle constraints
- Scale: proportional constraint binding (if supported)

## Acceptance Criteria
- [ ] Collinear constraint keeps points/lines aligned
- [ ] Block constraint locks entities in place
- [ ] Construction toggle affects rendering and export
- [ ] Equal angle constrains multiple angles to same value
- [ ] Scale constraint maintains proportional relationship
- [ ] All constraints show in property panel
- [ ] Redundancy detection updated for new constraints
- [ ] Unit tests for new constraint types

## Dependencies
- Phase 1-4 (larger sketches to demonstrate constraints)
- Existing constraint infrastructure

## Complexity Estimate
**Medium** — Most constraints are variations on existing patterns. PlaneGCS support is key blocker.

## Related Files
- `packages/parametric/src/sketch/commands/sketchConstraints.ts` — reference implementations
- `packages/parametric/src/sketch/solver.ts` — constraint solver loop
- `packages/parametric/src/sketch/sketchModel.ts` — data model

## Investigation Tasks
1. [ ] Check PlaneGCS for collinear/scale constraint support
2. [ ] Define Block constraint implementation (wrap multiple Fix?)
3. [ ] Design construction geometry flag storage

## Notes
- Block constraint is mainly convenience (UI sugar over 2x Fix constraints)
- Construction geometry needs persistent flag in sketch serialization
- Equal angle works on any angle constraint, not just explicit dimension
- Scale constraint may be deferred if PlaneGCS doesn't support it (treat as Phase 6 research item)
