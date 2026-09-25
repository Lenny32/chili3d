# CONSTRUCT-05: Construction Axis Tools

## Summary

Add all five construction-axis tools. Ref Segment is a finite annotation and does not provide an associative mathematical axis.

## Scope

- **Axis Through Cylinder/Cone/Torus:** derive the symmetry axis of a supported analytic face.
- **Axis Perpendicular To Face:** derive the local normal through a selected point on a face, construction plane, or origin plane. Covers the older Axis Perpendicular at Point name.
- **Axis Through Two Planes:** use the intersection line of two nonparallel planes.
- **Axis Through Two Points:** use two distinct vertices, supported snap points, or construction points.
- **Axis Through Edge:** extend a selected linear edge mathematically into an axis.
- Persist defining references and orientation. Expose display size independently from axis geometry.
- Make created axes usable by revolve and plane tools through the shared selection contracts.

## Acceptance Criteria

- [ ] Each tool creates the mathematically expected origin/direction for supported inputs.
- [ ] Analytic axes work for transformed cylinders, cones, and tori, including trimmed faces.
- [ ] Normal axes pass through the selected point and follow the local face normal.
- [ ] Parallel/coincident planes, duplicate points, nonlinear edges, unsupported surfaces, and undefined normals produce errors without creating invalid axes.
- [ ] Source edits update axes and an axis-dependent revolve or angled plane.
- [ ] Tests confirm a reference axis is not limited by its rendered segment length.
- [ ] Preview, cancellation, property editing, undo/redo, and save/load work for all five definitions.

## Dependencies and Complexity

Depends on [CONSTRUCT-01](construct-01-foundation.md). Construction-plane and point objects are optional inputs; origin planes, faces, edges, and vertices must work independently of their creation tickets. Complexity: medium.
