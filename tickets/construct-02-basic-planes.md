# CONSTRUCT-02: Offset Plane, Midplane, and Plane At Angle

## Summary

Add the core plane tools for placing sketches beyond existing planar faces and origin planes.

## Scope

- **Offset Plane:** select a planar face, origin plane, or construction plane and enter a signed distance in millimetres. Support placement through a selected reference point as a To Object mode.
- **Midplane:** select two planes or planar faces. Support the halfway plane for parallel inputs and a selectable angle bisector for intersecting inputs. Make orientation and solution choice deterministic.
- **Plane At Angle:** select a linear edge or axis, establish a stable reference orientation, and enter an angle in degrees. Expose the baseline when the axis alone cannot determine it unambiguously.
- Provide numeric editing, live preview, and persistent source references. Support an additional normal offset for Plane At Angle; Midplane remains defined by its two inputs.

## Implementation Areas

Use CONSTRUCT-01's object/evaluation contracts; add commands in the appropriate feature package, Construct ribbon entries, localized labels, and property editors. Use `workingPlane.ts` only as interaction reference, not as the persistence mechanism.

## Acceptance Criteria

- [ ] Positive, negative, and zero offsets yield the expected origin and normal.
- [ ] To Object placement follows the referenced point after source edits.
- [ ] Parallel midplanes remain equidistant; intersecting-plane bisector selection survives save/load and edits.
- [ ] Coincident or otherwise ambiguous midplane inputs have explicit validation or a documented deterministic result.
- [ ] Angled planes contain the selected axis before the optional offset and reproduce the requested angle from the stored baseline.
- [ ] Source orientation reversal does not unexpectedly flip a previously defined plane.
- [ ] Every tool supports preview, cancel, property editing, undo/redo, and serialization.
- [ ] A sketch attached to each plane follows upstream source and parameter changes.
- [ ] Tests cover transformed source geometry and degenerate inputs.

## Dependencies and Complexity

Depends on [CONSTRUCT-01](construct-01-foundation.md). Complexity: medium.
