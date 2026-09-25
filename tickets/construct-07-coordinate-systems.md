# CONSTRUCT-07: User Coordinate System

## Summary

Add a persistent User Coordinate System (UCS) with an editable origin and orientation. Selecting an existing working plane is not equivalent to defining a reusable coordinate frame.

## Scope

- Define a frame from an origin point and two nonparallel direction references, with explicit axis assignment and reversal controls.
- Accept existing vertices/edges and construction points/axes as references; offer an explicit fixed-coordinate definition for intentional non-associative frames.
- Evaluate an orthonormal, right-handed frame and expose its XY, YZ, and ZX planes and X, Y, and Z axes through reference selection.
- Display a named selectable triad with independent visibility and display size.
- Allow users to activate UCS-derived working planes and create associated sketches.
- Reuse CONSTRUCT-01's dependency, history, and serialization contracts. Do not add assembly or manufacturing systems as part of this ticket.

## Acceptance Criteria

- [ ] Origin and direction references create the expected right-handed orthonormal frame.
- [ ] Zero-length and parallel direction inputs are rejected with clear errors.
- [ ] Axis reversal and assignment produce stable, editable orientation.
- [ ] Source edits update the UCS and sketches attached to its derived planes.
- [ ] Derived plane/axis references keep stable identity through edits and save/load.
- [ ] Local-to-world and world-to-local transformations round-trip points within tolerance, including transformed source nodes.
- [ ] Users can name, hide, select, edit, undo/redo, and serialize the UCS.
- [ ] Existing global XY/YZ/ZX working-plane selection remains available.

## Dependencies and Complexity

Depends on [CONSTRUCT-01](construct-01-foundation.md). Axis/point creation tickets broaden available inputs but are not prerequisites for edge/vertex-based frames. Complexity: medium-high.
