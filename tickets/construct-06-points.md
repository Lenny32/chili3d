# CONSTRUCT-06: Construction Point Tools

## Summary

Add six associative point definitions. The existing generic Point command stores a picked position but does not retain the selected source relationship.

## Scope

- **Point At Vertex:** retain a vertex or supported snap-reference identity. Define the supported snap types explicitly; do not silently convert associative picks to fixed coordinates.
- **Point Through Two Edges:** calculate a unique intersection of supported edges or their extensions; reject skew inputs and request a solution when multiple intersections exist.
- **Point Through Three Planes:** calculate a unique intersection of three planes or planar faces.
- **Point At Center Of Circle/Sphere/Torus:** derive the analytic center from supported circular geometry or spherical/toroidal faces.
- **Point At Edge And Plane:** intersect a linear edge or axis with a plane or planar face, including the line's extension.
- **Point Along Path:** place by arc-length distance or normalized position along an edge, sketch curve, or connected chain; define direction and supported extension behavior.
- Store source definitions and any solution selection so points recompute and remain usable by other construction tools.

## Acceptance Criteria

- [ ] All six definitions evaluate to expected positions, including transformed source geometry.
- [ ] Vertex and center points follow source edits instead of retaining frozen coordinates.
- [ ] Intersection tools distinguish no solution, one solution, multiple solutions, and infinitely many solutions.
- [ ] Parallel, coincident, skew, singular, and unsupported inputs produce actionable errors.
- [ ] Along-path distance uses arc length; reversed paths, endpoints, chains, seams, and extensions have deterministic behavior.
- [ ] Editing sources updates a downstream construction object consuming a point.
- [ ] Preview, cancellation, property editing, undo/redo, and serialization work for every definition.
- [ ] Existing generic Point and sketch-point workflows remain functional.

## Dependencies and Complexity

Depends on [CONSTRUCT-01](construct-01-foundation.md). Share path evaluation with [CONSTRUCT-03](construct-03-reference-planes.md) when available, without requiring its UI. Complexity: medium-high.
