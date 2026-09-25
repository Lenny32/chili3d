# INSPECT-17: Find Similar Components

## Summary

Search a defined component library by geometric similarity.

Status: planned. Priority: P3.

## Scope

- Start with a feasibility/design deliverable defining library scope, indexing, geometry descriptors, scoring, and placement/scale invariance.
- Specify local versus remote storage, index invalidation, supported formats, and explicit data-transfer behavior.
- Implement a bounded searchable library and ranked results with preview, source identity, and similarity explanation.
- Provide opening/inserting a selected result through existing document workflows; defer replacement until reference-preservation semantics are defined.
- State the scope difference from Fusion's hub-wide search; do not claim AI equivalence unless such a method is implemented and evaluated.

## Implementation Areas

New library/index service, packages/core/src/, packages/ui/src/, document/import workflows.

## Acceptance Criteria

- [ ] A labeled fixture corpus and relevance targets are documented before implementation.
- [ ] Known duplicates under rigid transforms rank appropriately; similar and dissimilar fixtures meet the declared targets.
- [ ] Changed/deleted library entries update the index; empty and unavailable libraries show useful states.
- [ ] Results can be previewed and opened/inserted without altering the query model unexpectedly.
- [ ] Indexing/search can be cancelled and no remote upload occurs without an explicit configured workflow.
- [ ] Apply the shared implementation and verification requirements in the [Inspect roadmap](inspect-roadmap.md).

## Dependencies and Complexity

Dependencies: Component library/index prerequisite; 00 for UI conventions only. Numbered dependencies refer to INSPECT tickets in the [roadmap](inspect-roadmap.md). Complexity: very high.

