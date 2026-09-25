# INSPECT-01: Unified Selection-Based Measure

## Summary

Extend the existing Length, Angle, and Select commands into a single geometry-aware measurement inspector.

Status: planned. Priority: P1.

## Scope

- Support point coordinates, point-to-point distance, minimum distance between supported selected entities, and angles between linear edges or planar faces.
- Report edge length, circle/arc radius and diameter, face area, and solid volume where applicable; retain accumulated length/area/volume totals.
- Offer explicit units, adjustable precision, copyable values, highlighted selections, and witness geometry. Define supported selection combinations and angle conventions.
- Retain existing point-picking workflows and shortcuts; use existing measurement implementations as a starting point.
- Add guarded kernel distance queries where needed; do not substitute bounding-box distance for geometric minimum distance.

## Implementation Areas

packages/app/src/commands/measure/, packages/core/src/shape/, packages/wasm/src/, cpp/src/, packages/ui/src/.

## Acceptance Criteria

- [ ] Known point, line, circle, box, and separated-body fixtures return expected values within declared tolerances.
- [ ] Touching/intersecting objects report zero minimum distance and transformed objects measure in world coordinates.
- [ ] Selection changes refresh relevant results; unsupported or invalid inputs show actionable feedback.
- [ ] Existing length, angle, area, volume, and totals workflows remain available.
- [ ] Precision, units, copy actions, witness display, and cancellation are verified.
- [ ] Apply the shared implementation and verification requirements in the [Inspect roadmap](inspect-roadmap.md).

## Dependencies and Complexity

Dependencies: 00. Numbered dependencies refer to INSPECT tickets in the [roadmap](inspect-roadmap.md). Complexity: medium-high.

