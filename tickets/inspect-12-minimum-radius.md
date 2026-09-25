# INSPECT-12: Minimum Concave Radius Analysis

## Summary

Highlight concave surface regions below a specified radius threshold.

Status: planned. Priority: P2.

## Scope

- Use oriented principal curvature to distinguish concave from convex regions.
- Accept a positive minimum radius in document units and visualize violations with a legend.
- Report undefined curvature and sampling limits explicitly.
- Explain that a passing local radius check does not prove tool accessibility or collision-free machining.

## Implementation Areas

Surface curvature queries from INSPECT-06, packages/three/src/, packages/ui/src/.

## Acceptance Criteria

- [ ] Concave fillets below, equal to, and above the threshold classify correctly within tolerance.
- [ ] Convex fillets and planar faces are not flagged as tight concave regions.
- [ ] Reversed topology orientation and transformed geometry are handled consistently.
- [ ] Threshold editing, singular regions, persistence, and source changes are verified.
- [ ] Apply the shared implementation and verification requirements in the [Inspect roadmap](inspect-roadmap.md).

## Dependencies and Complexity

Dependencies: 00, 06. Numbered dependencies refer to INSPECT tickets in the [roadmap](inspect-roadmap.md). Complexity: high.

