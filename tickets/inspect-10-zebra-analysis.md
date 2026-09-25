# INSPECT-10: Zebra Surface Continuity Analysis

## Summary

Add adjustable zebra stripes for visual assessment of surface continuity.

Status: planned. Priority: P2.

## Scope

- Apply a temporary stripe/reflection shader to selected bodies or faces.
- Provide stripe direction, density, and contrast controls with predictable camera behavior.
- Preserve face boundaries and normals so shading does not conceal discontinuities.
- Explain that the display is a visual diagnostic affected by tessellation, not proof of mathematical continuity.

## Implementation Areas

packages/three/src/, packages/ui/src/, analysis material override infrastructure.

## Acceptance Criteria

- [ ] Fixtures with positional gaps, tangent breaks, and smooth transitions show distinct stripe behavior.
- [ ] Stripe controls update immediately and transforms preserve expected orientation.
- [ ] Selections, analysis visibility, and switching analyses restore previous materials.
- [ ] Manual viewport checks cover seams and tessellation quality.
- [ ] Apply the shared implementation and verification requirements in the [Inspect roadmap](inspect-roadmap.md).

## Dependencies and Complexity

Dependencies: 00. Numbered dependencies refer to INSPECT tickets in the [roadmap](inspect-roadmap.md). Complexity: medium-high.

