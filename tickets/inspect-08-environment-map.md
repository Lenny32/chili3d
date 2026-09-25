# INSPECT-08: Environment Map Surface Inspection

## Summary

Inspect surface reflections through a temporary reflective viewport appearance.

Status: planned. Priority: P2.

## Scope

- Apply a temporary chrome appearance to selected bodies with a bundled, appropriately licensed environment.
- Provide environment selection, rotation, and mirror-finish controls.
- Preserve underlying material settings and define interaction with other analysis overrides.
- Document tessellation limitations and offer existing quality controls where available.

## Implementation Areas

packages/three/src/, packages/ui/src/, analysis settings and asset loading.

## Acceptance Criteria

- [ ] Environment rotation and surface orientation visibly change reflections.
- [ ] Only selected bodies receive the override.
- [ ] Cancel, hide, delete, and document close restore original materials and environment.
- [ ] Resources are released and saved settings recreate the analysis after reopening.
- [ ] Apply the shared implementation and verification requirements in the [Inspect roadmap](inspect-roadmap.md).

## Dependencies and Complexity

Dependencies: 00. Numbered dependencies refer to INSPECT tickets in the [roadmap](inspect-roadmap.md). Complexity: medium.

