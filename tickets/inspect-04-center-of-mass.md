# INSPECT-04: Center of Mass Analysis

## Summary

Add a persistent measurable mass-center marker for selected solids.

Status: planned. Priority: P1.

## Scope

- Expose guarded volume-property queries and aggregate world-space centers using mass weights.
- Define density input and units; support per-body density for mixed-material selections. Explicitly label uniform-density assumptions when material density is unavailable.
- Show coordinates, total volume, and mass when density is defined; make the marker selectable by measurement tools.
- Update after source shape, transform, or density changes; distinguish center of mass from bounding-box center.

## Implementation Areas

packages/core/src/shape/, packages/wasm/src/shape.ts, cpp/src/shape.cpp, packages/three/src/, measurement commands.

## Acceptance Criteria

- [ ] Boxes and asymmetric composite fixtures match analytically calculated centers.
- [ ] Unequal densities shift the combined center as expected; invalid/zero densities are rejected.
- [ ] Transformed solids and supported scaling produce correct coordinates and volumes.
- [ ] Open, invalid, or zero-volume geometry gives explicit feedback.
- [ ] Marker visibility, save/load, source edits, and measurement picking work.
- [ ] Apply the shared implementation and verification requirements in the [Inspect roadmap](inspect-roadmap.md).

## Dependencies and Complexity

Dependencies: 00. Numbered dependencies refer to INSPECT tickets in the [roadmap](inspect-roadmap.md). Complexity: medium-high.

