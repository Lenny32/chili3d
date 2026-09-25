# Phase 2: Geometry Editing

## Summary
Add tools to modify and refine existing sketch geometry: Trim, Extend, Split, and Offset.

## Scope

### Trim Tool
- Remove portions of lines, arcs, circles between intersection points
- Multi-select mode: keep trimming until exit
- Undo works per trim operation
- Visual feedback: highlight removable segments on hover

### Extend Tool
- Extend lines/arcs to meet other geometry
- Pick target geometry to extend to
- Multi-extend mode available

### Split/Break Tool
- Split a line, arc, or circle at a point or intersection
- Creates two entities from one
- Inherits constraints where applicable

### Offset Curve Tool
- Offset lines and arcs by fixed distance
- Direction: left/right (or inward/outward for circles)
- Offset copies are independent (no constraint link)
- Handles self-intersection gracefully

## Implementation Details

### Files to Create
- `packages/parametric/src/sketch/commands/sketchTrim.ts`
- `packages/parametric/src/sketch/commands/sketchExtend.ts`
- `packages/parametric/src/sketch/commands/sketchSplit.ts`
- `packages/parametric/src/sketch/commands/sketchOffset.ts`

### Files to Modify
- `packages/parametric/src/sketch/ribbon.ts` — add to Create/Modify group
- `packages/parametric/src/sketch/editor/sketchEditor.ts` — geometry modification logic
- `packages/parametric/src/sketch/solver.ts` — entity removal/splitting
- `packages/parametric/src/sketch/editor/sketchAnnotations.ts` — preview feedback

### Solver Extensions Needed
- Entity removal (cascading constraint cleanup)
- Entity splitting (ID tracking for sub-entities)
- Offset computation (geometric, not constraint-based)

## Acceptance Criteria
- [ ] Trim tool removes geometry segments correctly
- [ ] Extend tool lengthens lines/arcs to targets
- [ ] Split tool divides entities and preserves constraints where valid
- [ ] Offset tool creates parallel/concentric geometry
- [ ] All tools show preview before confirmation
- [ ] Undo/redo works correctly for all operations
- [ ] No orphaned constraints after deletion
- [ ] Unit tests for geometry operations

## Dependencies
- Phase 1 (nice to have: more geometry types to work with)
- Existing line/arc/circle infrastructure

## Complexity Estimate
**Medium-High** — Constraint cleanup and preview rendering are tricky.

## Related Files
- `packages/parametric/src/sketch/commands/sketchRectangle.ts` — multi-step pattern
- `packages/parametric/src/sketch/solver.ts` — constraint management
- `packages/parametric/src/sketch/editor/sketchEventHandler.ts` — user interaction

## Notes
- Trim/Extend must handle intersection detection (use kernel or custom math)
- Split at point requires snapping to ensure clean cut
- Offset may need to handle degenerate cases (zero offset, self-intersecting result)
- Consider grouping tools under "Modify" submenu if ribbon space is tight
