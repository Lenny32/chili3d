# INSPECT-07: Draft Angle Analysis

## Summary

Show draft angles relative to a selected pull direction.

Status: planned. Priority: P2.

## Scope

- Select bodies/faces and a direction from an axis, linear edge, or plane normal; accept construction references when available.
- Define signed draft angle relative to the pull direction, threshold colors, zero-draft band, and pull-direction reversal.
- Expose a numeric legend and sampled values; handle outward normals and reversed faces consistently.
- Explain that local normal-based draft results do not establish global tool accessibility.

## Implementation Areas

packages/wasm/src/surface.ts, cpp/src/geometry.cpp, packages/three/src/, packages/ui/src/.

## Acceptance Criteria

- [ ] Known tapered, vertical, and perpendicular faces display expected signed angles.
- [ ] Reversing pull direction changes classifications predictably.
- [ ] Threshold edits and transformed geometry produce correct results.
- [ ] Invalid normals are marked unknown; lifecycle and material restoration work.
- [ ] Apply the shared implementation and verification requirements in the [Inspect roadmap](inspect-roadmap.md).

## Dependencies and Complexity

Dependencies: 00. Numbered dependencies refer to INSPECT tickets in the [roadmap](inspect-roadmap.md). Complexity: medium-high.

