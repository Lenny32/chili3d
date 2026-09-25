# CONSTRUCT-03: Planes Through References and Along Paths

## Summary

Add Plane Through Two Edges, Plane Through Three Points, and Plane Along Path. Promote the existing Section computation into a persistent plane definition.

## Scope

- **Plane Through Two Edges:** accept two distinct coplanar linear edges or axes, including parallel lines. Reject skew or coincident lines that cannot uniquely define a plane.
- **Plane Through Three Points:** accept vertices, supported associative snap points, and construction points. Reject duplicate or collinear points.
- **Plane Along Path:** accept an edge, sketch curve, connected path, or construction axis. Place the plane normal to the path tangent using distance or normalized path position. Support To Object positioning and document how ambiguous projections are resolved.
- Support placement beyond finite path ends where a meaningful extension exists; reject unsupported extensions explicitly.
- Define path direction, tangent-chain handling, and orientation at seams and corners. Preserve the user's selected location/branch across rebuilds.
- Support an additional normal offset for the computed planes.

## Implementation Areas

Reuse curve/tangent computations from `packages/app/src/commands/workingPlane.ts` (`FromSection`), with stable references and evaluation supplied by CONSTRUCT-01. Keep the existing Section working-plane shortcut available.

## Acceptance Criteria

- [ ] Two-edge and three-point tools produce planes containing the defining geometry before an optional offset.
- [ ] Invalid, collinear, coincident, and skew inputs show clear errors and create no object.
- [ ] Path distance uses geometric arc length rather than assuming curve parameter equals distance.
- [ ] Along-path normals match evaluated tangents on straight and curved paths.
- [ ] Reversed paths, closed seams, corners, zero-length paths, and ambiguous To Object projections follow documented deterministic rules.
- [ ] Path, point, and offset edits update the plane and attached sketches.
- [ ] Preview, cancellation, edit, undo/redo, transformed references, and save/load are covered.

## Dependencies and Complexity

Depends on [CONSTRUCT-01](construct-01-foundation.md). Complexity: medium-high, chiefly path evaluation and stable orientation.
