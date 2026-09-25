# INSPECT-00: Analysis Lifecycle and Display Foundation

## Summary

Provide shared document and viewport infrastructure for editable inspection analyses.

Status: planned. Priority: P1.

## Scope

- Define serializable analysis definitions, source references, result status, ownership, and recomputation rules; store definitions rather than generated render resources.
- Add an Analysis tree group with rename, visibility, edit, delete, undo/redo, and save/load. Keep analyses outside the solid-producing feature chain.
- Resolve transformed and parametric source geometry using stable references; mark missing or ambiguous sources invalid instead of silently reattaching.
- Provide temporary overlays, legends, clipping and material override ownership, cancellation, disposal, and explicit coexistence rules for analyses.
- Keep expensive evaluation cancellable and discard stale results after source edits. Hidden analyses may evaluate lazily but must refresh before display.
- Establish shared Inspect ribbon, localized labels/errors, units, tolerance, and precision conventions. Preserve existing Check Shape and geometry-producing Section commands.

## Implementation Areas

packages/core/src/, packages/parametric/src/, packages/ui/src/, packages/three/src/, packages/builder/src/ribbon.ts, packages/i18n/src/en.ts.

## Acceptance Criteria

- [ ] An internal analysis fixture survives save/load, source edits, hide/show, deletion, and undo/redo.
- [ ] Lost references produce visible errors; transformed sources evaluate in the correct coordinate system.
- [ ] Cancel and document close release render resources and restore previous display state.
- [ ] Concurrent or successive analyses cannot overwrite newer results or leave stale overlays.
- [ ] A design note documents ownership, dependency resolution, invalidation, and display conflict rules.
- [ ] Apply the shared implementation and verification requirements in the [Inspect roadmap](inspect-roadmap.md).

## Dependencies and Complexity

Dependencies: None. Numbered dependencies refer to INSPECT tickets in the [roadmap](inspect-roadmap.md). Complexity: high.

