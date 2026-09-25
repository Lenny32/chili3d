# CONSTRUCT-04: Tangent and Perpendicular Planes

## Summary

Add explicit surface-based plane tools. Existing Align samples `face.normal(0, 0)` and changes the working plane; it lacks selectable contact location and a persistent definition.

## Scope

- **Tangent Plane:** support cylindrical and conical faces with contact/orientation controls, plus a point-on-face mode for supported smooth surfaces (covering the older Plane Tangent to Face at Point workflow).
- Retain the surface and contact-point references, tangent solution choice, and optional normal offset.
- **Perpendicular Plane:** support planar faces, construction planes, and smooth curved faces at a selected point. Expose an orientation reference where perpendicularity alone leaves a free rotation.
- Provide placement distance controls and visible orientation previews. Store sufficient references to reproduce the same plane after a rebuild.
- Validate supported surface geometry and contact points before calling kernel queries; reject singularities and undefined normals.

## Acceptance Criteria

- [ ] A zero-offset tangent plane passes through its contact point and has the surface normal at that point.
- [ ] Cylinder and cone orientation/contact controls select reproducible solutions.
- [ ] A perpendicular plane's normal is orthogonal to the reference plane normal or local surface normal.
- [ ] Contact points outside the supported face domain, cone apices, undefined normals, and ambiguous orientation inputs produce actionable errors.
- [ ] Source geometry and contact-point edits update the plane and its consumers without arbitrary orientation flips.
- [ ] Tools support transformed faces, preview, cancel, parameter editing, undo/redo, and serialization.
- [ ] Tests assert tangent/perpendicular geometry numerically and exercise invalid surface cases without a WASM abort.

## Dependencies and Complexity

Depends on [CONSTRUCT-01](construct-01-foundation.md). Complexity: high because of surface evaluation, singularities, and orientation selection.
