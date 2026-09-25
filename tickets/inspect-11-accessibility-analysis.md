# INSPECT-11: Directional Accessibility Analysis

## Summary

Classify surface regions by access from a selected approach direction.

Status: planned. Priority: P2.

## Scope

- Select bodies, approach direction, and the geometry considered as potential obstruction.
- Evaluate occlusion as well as face orientation; distinguish accessible, obstructed, and unknown regions.
- Provide sampling resolution and clear accuracy limits; define tangent/grazing-ray handling.
- Describe results as directional point access, not collision-free clearance for a finite tool or holder.

## Implementation Areas

packages/three/src/, geometry query layer, packages/ui/src/.

## Acceptance Criteria

- [ ] Overhang and pocket fixtures identify occluded regions that normal-only draft checks miss.
- [ ] Changing approach direction updates classifications.
- [ ] Other selected obstruction bodies and nested transforms are respected.
- [ ] Resolution limits, unknown geometry, cancellation, and source invalidation are visible and tested.
- [ ] Apply the shared implementation and verification requirements in the [Inspect roadmap](inspect-roadmap.md).

## Dependencies and Complexity

Dependencies: 00. Numbered dependencies refer to INSPECT tickets in the [roadmap](inspect-roadmap.md). Complexity: high.

