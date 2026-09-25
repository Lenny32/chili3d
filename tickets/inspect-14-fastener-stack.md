# INSPECT-14: Fastener Stack Analysis

## Summary

Validate bolt, washer, nut, and hole stacks once semantic fastener inputs exist.

Status: planned. Priority: P3.

## Scope

- First define stack membership, hole axes, fastener dimensions, units, and manual assignment/import contracts; do not infer semantics from shape names.
- Support an initial explicit stack workflow with checks for diameter compatibility, alignment, bolt reach, and configured engagement limits.
- Document supported fastener types and standards/data provenance without implying structural certification.
- Highlight problematic members and explain each failed or unavailable check.
- Keep assembly modeling and automatic catalog insertion as separate prerequisite work if they exceed the data contract scope.

## Implementation Areas

New assembly/fastener data contracts, packages/core/src/, packages/ui/src/, geometry queries.

## Acceptance Criteria

- [ ] Prerequisite implementation tasks and a supported-check matrix are recorded before coding the analyzer.
- [ ] Valid, short-bolt, misaligned, and incompatible-diameter fixtures produce expected results.
- [ ] Missing metadata produces an incomplete result rather than a pass.
- [ ] Changing placement or dimensions invalidates analysis; findings navigate to the affected stack.
- [ ] Apply the shared implementation and verification requirements in the [Inspect roadmap](inspect-roadmap.md).

## Dependencies and Complexity

Dependencies: 00; assembly/fastener metadata prerequisite. Numbered dependencies refer to INSPECT tickets in the [roadmap](inspect-roadmap.md). Complexity: very high.

