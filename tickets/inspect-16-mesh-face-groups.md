# INSPECT-16: Display Mesh Face Groups

## Summary

Display actual semantic face groups on imported or created mesh bodies.

Status: planned. Priority: P3.

## Scope

- Audit current mesh storage and distinguish render draw groups from semantic face groups.
- Define stable group identifiers and preserve imported grouping where supported; specify explicit behavior for ungrouped meshes.
- Add a color toggle and legend/selection behavior without modifying underlying materials.
- Document how retessellation, topology edits, and unsupported import formats affect groups; never invent groups silently.

## Implementation Areas

Mesh/import data contracts in packages/core/src/, packages/wasm/src/, packages/three/src/, packages/ui/src/.

## Acceptance Criteria

- [ ] Meshes with known groups display consistent distinct colors.
- [ ] Ungrouped meshes report unavailable grouping or use a documented explicit grouping action.
- [ ] Round-trip preserves supported group metadata and display state.
- [ ] Edits invalidate obsolete groups and disabling restores original appearance.
- [ ] Apply the shared implementation and verification requirements in the [Inspect roadmap](inspect-roadmap.md).

## Dependencies and Complexity

Dependencies: 00; mesh face-group metadata prerequisite. Numbered dependencies refer to INSPECT tickets in the [roadmap](inspect-roadmap.md). Complexity: high.

