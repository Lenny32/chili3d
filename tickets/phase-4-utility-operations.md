# Phase 4: Utility Operations

## Summary
Add sketch entity manipulation tools: Mirror, Copy, Paste, Move, and Rotate.

## Scope

### Mirror Tool
- Mirror selected entities across a line (construction line or existing geometry)
- Create mirrored copies or replace original
- Auto-create symmetry constraints between original and mirror
- Batch mirror multiple selection

### Copy / Paste
- Copy selected entities to clipboard (sketch-local or global)
- Paste into same or different sketch
- Paste offset option (place relative to pick point)
- Preserve constraint relationships within copied set

### Move Tool
- Translate selected entities by distance or drag
- Anchor point: center of selection or user-picked
- Preserve internal constraints, break external ones

### Rotate Tool
- Rotate selected entities around center point
- Input: center + angle (absolute or relative)
- Preserve internal constraints

## Implementation Details

### Files to Create
- `packages/parametric/src/sketch/commands/sketchMirror.ts`
- `packages/parametric/src/sketch/commands/sketchCopy.ts`
- `packages/parametric/src/sketch/commands/sketchPaste.ts`
- `packages/parametric/src/sketch/commands/sketchMove.ts`
- `packages/parametric/src/sketch/commands/sketchRotate.ts`

### Files to Modify
- `packages/parametric/src/sketch/ribbon.ts` — add to Modify/Utility group
- `packages/parametric/src/sketch/editor/sketchEditor.ts` — entity transformation
- `packages/parametric/src/sketch/solver.ts` — constraint handling during transforms
- `packages/parametric/src/sketch/sketchModel.ts` — clipboard representation

### Solver Extensions Needed
- Constraint filtering (keep internal, break external)
- Symmetry constraint generation
- ID remapping for copied entities

## Acceptance Criteria
- [ ] Mirror tool creates symmetric copies with symmetry constraints
- [ ] Copy/Paste preserves internal sketch relationships
- [ ] Move tool translates selection while preserving constraints
- [ ] Rotate tool rotates selection by angle
- [ ] Multi-entity operations work correctly
- [ ] Undo/redo for all operations
- [ ] Constraints are correctly updated/preserved
- [ ] Unit tests for geometry transformations

## Dependencies
- Phase 1-2 (larger geometry sets to practice with)
- Existing constraint system

## Complexity Estimate
**Medium** — Mostly geometric math and constraint re-mapping. No solver algorithm changes needed.

## Related Files
- `packages/parametric/src/sketch/commands/sketchMultistepCommand.ts` — multi-step pattern
- `packages/parametric/src/sketch/solver.ts` — constraint management
- `packages/parametric/src/sketch/editor/sketchEditor.ts` — selection and transforms

## Notes
- Clipboard should be sketch-agnostic (allow paste across different sketches)
- Mirror over a line requires line entity or construction geometry
- Move/Rotate preview should show result before commit
- Consider "Repeat Transform" (repeat last operation on new selection)
