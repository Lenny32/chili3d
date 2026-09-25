# INSPECT-02: Interactive Section Analysis

## Summary

Add a non-destructive adjustable cutaway view alongside the existing geometry-producing Section command.

Status: planned. Priority: P1.

## Scope

- Select an origin plane or planar face; support construction planes when their contracts are available.
- Provide signed offset, rotation, flip direction, live preview, and cut-face visualization with a defined cap strategy.
- Save plane settings and source references as editable analyses with a clear visible-body scope.
- Handle clipping consistently for rendering, picking, highlights, and overlays; leave model topology unchanged.

## Implementation Areas

packages/three/src/, packages/core/src/visual/, packages/ui/src/, packages/app/src/commands/create/section.ts.

## Acceptance Criteria

- [ ] Moving and rotating the cut plane reveals the expected interior of solids, including cavities.
- [ ] Flipping reverses the retained side; hiding or deleting restores the full view.
- [ ] Settings round-trip and source changes update the plane without modifying the model.
- [ ] Nested transforms, multiple bodies, selection, cancellation, and cap appearance are checked.
- [ ] Existing create.section still creates intersection geometry.
- [ ] Apply the shared implementation and verification requirements in the [Inspect roadmap](inspect-roadmap.md).

## Dependencies and Complexity

Dependencies: 00. Numbered dependencies refer to INSPECT tickets in the [roadmap](inspect-roadmap.md). Complexity: high.

