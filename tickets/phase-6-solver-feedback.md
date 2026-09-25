# Phase 6: Solver Feedback & Analysis

## Summary
Add constraint solver diagnostics, visualization, and automation to help users understand and refine sketch constraints.

## Scope

### Constraint Solver Status Panel
- Display: fully constrained, under-constrained, over-constrained
- List redundant constraints with conflict info
- Click to highlight conflicting constraint in sketch
- Real-time updates as user adds/removes constraints

### Under-Constrained Warning
- Visual indicator (icon/color) on underconstrained sketch
- Show which DoF are free (e.g., "translate X-Y", "rotate Z")
- Suggest constraints to fully constrain (heuristic recommendations)

### Over-Constrained Detection
- Highlight redundant/conflicting constraints
- Explain why conflict exists (which constraints conflict)
- Option to auto-remove redundant constraint
- Solver conflict resolution UI

### Auto-Dimension
- Scan sketch for dimensioned geometry
- Suggest missing dimensions (heuristic)
- Batch-add suggested constraints with one action
- User review before applying

### Construction Analysis
- Identify unused construction geometry
- Flag construction geometry that constrains nothing
- Clean-up suggestions

## Implementation Details

### Files to Create
- `packages/parametric/src/sketch/commands/sketchAutoConstrain.ts`
- `packages/parametric/src/sketch/editor/solverFeedback.ts`
- `packages/parametric/src/sketch/editor/constraintAnalyzer.ts`

### Files to Modify
- `packages/parametric/src/sketch/editor/sketchEditor.ts` — solver status polling
- `packages/parametric/src/sketch/solver.ts` — expose redundancy/conflict info
- `packages/ui/` — constraint panel UI (new or extend existing)
- `packages/parametric/src/sketch/commands/sketchDimensions.ts` — auto-dimension integration
- `packages/parametric/src/sketch/ribbon.ts` — add auto-constrain to Finish group

### Solver API Needs
- Query: solver status (fully/under/over-constrained)
- Query: redundant constraints (which + why)
- Query: conflicting constraint pairs
- Query: degrees of freedom remaining
- PlaneGCS introspection (internal redundancy detection)

## Acceptance Criteria
- [ ] Constraint panel displays solver status accurately
- [ ] Under-constrained sketches show warning and free DoF list
- [ ] Redundant constraints are detected and highlighted
- [ ] Conflict explanation helps user resolve issues
- [ ] Auto-dimension suggests reasonable constraints
- [ ] Batch constraint application works correctly
- [ ] Construction geometry analysis identifies unused items
- [ ] Status updates in real-time as user edits
- [ ] Unit tests for analyzer logic

## Dependencies
- All prior phases (solver must be stable)
- PlaneGCS introspection capability (research)

## Complexity Estimate
**High** — Requires deep solver integration and heuristic logic for suggestions.

## Related Files
- `packages/parametric/src/sketch/solver.ts` — solver state and queries
- `packages/parametric/src/sketch/planegcs.ts` — PlaneGCS wrapper
- `packages/ui/src/` — UI panel components

## Investigation Tasks
1. [ ] Review PlaneGCS for redundancy/conflict reporting API
2. [ ] Prototype analyzer heuristics (what = "reasonable" constraint suggestion?)
3. [ ] Design constraint conflict UI (how to show which constraints clash?)
4. [ ] Measure performance of real-time analysis (large sketches)

## Design Questions
- **Auto-Dimension Heuristic:** What makes a "good" suggestion? (all lines get length? all circles get radius?)
- **Conflict Resolution:** Auto-remove or user-select which to keep?
- **Performance:** Can real-time analysis handle 100+ entities?
- **Wording:** How to explain solver state to non-expert users?

## Notes
- This phase may uncover PlaneGCS limitations; be ready to defer features
- Consider deferring "unused construction" analysis if it's expensive
- Auto-dimension should be conservative (suggest obvious cases, let user add the rest)
- Solver feedback is valuable even if constraints aren't perfect — users learn from it
