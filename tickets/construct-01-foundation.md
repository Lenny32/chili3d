# CONSTRUCT-01: Persistent Construction Geometry Foundation

## Summary

Introduce named, editable planes, axes, and points that remain associated with their defining geometry. Existing working-plane controls modify view state and cannot supply this lifecycle.

## Scope

- Define serializable construction definitions, evaluated geometry, stable identity, and explicit valid/invalid states.
- Decide and document ownership and evaluation order for standalone and body-dependent construction objects. Do not assume the current solid-producing body feature chain can store datum objects unchanged.
- Reuse tracked sub-shape references and timeline resolution where applicable; support references to origin geometry and other construction objects.
- Recompute dependents after edits; reject cycles and invalid forward references. Missing or ambiguous sources must produce visible errors rather than silently choosing another shape.
- Add document-tree entries, rename, visibility, selection, highlighting, preview, deletion, and property editing. Display extents must not alter the mathematical plane or axis.
- Integrate construction planes with sketch creation and working-plane selection, axes with revolve inputs, and points with point picking. Retain construction identity in associative consumers instead of copying only coordinates.
- Establish Construct ribbon organization and shared localized UI/error conventions while preserving existing working-plane controls.
- Provide minimal internal fixtures/builders for the three object kinds so the foundation can be tested before public creation tools exist.

## Implementation Areas

- `packages/core/src/`: document contracts, serialization, history, selection abstractions.
- `packages/parametric/src/`: dependency evaluation, tracked references, sketch-plane and revolve consumers.
- `packages/three/src/` and `packages/ui/src/`: reference visuals, tree and property editor.
- `packages/builder/src/ribbon.ts`, `packages/i18n/src/en.ts`, and localization keys.

## Acceptance Criteria

- [ ] A design note records ownership, ordering, reference resolution, and invalidation rules before tool implementations depend on them.
- [ ] Plane, axis, and point fixtures round-trip through document serialization with their definitions and identities intact.
- [ ] Creation, parameter editing, and deletion undo/redo restore objects and downstream results.
- [ ] Editing a source updates a dependent datum and a downstream sketch or revolve in the correct order.
- [ ] Deleted, ambiguous, cyclic, and unavailable timeline references produce actionable errors with no silent reattachment.
- [ ] References resolve correctly through transformed nodes, including geometry in groups.
- [ ] Objects can be named, hidden, selected, highlighted, and edited; hiding does not break dependencies.
- [ ] Preview cancellation creates no persistent object or history entry.
- [ ] Existing working-plane commands and legacy documents continue to work.

## Dependencies and Complexity

Dependencies: none. Complexity: high; establishes the contracts for every other Construct ticket.
