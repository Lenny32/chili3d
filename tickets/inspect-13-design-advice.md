# INSPECT-13: Plastic Part Design Advice

## Summary

Introduce an explicitly scoped plastic-part manufacturability advisor.

Status: planned. Priority: P3.

## Scope

- First document supported rules, required inputs, and the wall-thickness evaluation approach; this prerequisite is part of the ticket.
- Implement an initial rule set for wall-thickness variation, draft, and tight concave radii with configurable material/process thresholds.
- Group findings by severity, explain measured values and thresholds, and highlight affected regions.
- Mark unsupported or inconclusive checks explicitly; retain source geometry unchanged.
- Treat results as design guidance, not manufacturing certification or complete Fusion parity.

## Implementation Areas

Geometry thickness queries, INSPECT-07/12 services, packages/ui/src/, analysis result model.

## Acceptance Criteria

- [ ] A documented rule matrix states what is implemented, deferred, and required from the user.
- [ ] Fixtures with known thin/thick regions, insufficient draft, and small fillets produce expected findings.
- [ ] Changing thresholds updates findings; unsupported geometry never appears as a pass.
- [ ] Selecting a finding reveals its location and rationale; recomputation and cancellation work.
- [ ] Apply the shared implementation and verification requirements in the [Inspect roadmap](inspect-roadmap.md).

## Dependencies and Complexity

Dependencies: 00, 07, 12; wall-thickness query prerequisite. Numbered dependencies refer to INSPECT tickets in the [roadmap](inspect-roadmap.md). Complexity: very high.

