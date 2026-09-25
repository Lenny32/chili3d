# Advanced Inspect contracts and supported checks

Measurements use document millimetres, degrees, square millimetres, and cubic millimetres. A result that cannot be evaluated is **unknown**, never a pass. Analyses store source references and settings; display meshes and materials are temporary. Source edits, placement edits, or missing subshape references invalidate the result. A newer evaluation supersedes an older one.

## Plastic part advice (INSPECT-13)

The supported process is an injection-moulding review of one closed solid. The user supplies pull direction, nominal wall thickness, allowable variation, minimum draft angle, and minimum concave radius. These are configurable guidance thresholds; no material database or process simulation is bundled. Findings come from finite samples on face meshes and a forward ray query, not a continuous proof.

| Rule | Input and method | Supported result | Deferred or unknown |
|---|---|---|---|
| Draft | Outward face normals sampled on trimmed faces; signed angle to pull direction | Below threshold on sampled faces | Invalid normals, inaccessible faces, and unsampled regions are unknown. Local draft says nothing about global access. |
| Tight internal radius | Oriented principal curvature sampled on trimmed faces; negative curvature denotes concavity | Local radius below threshold | Singular or nonsmooth surfaces and unsampled regions are unknown. Passing does not establish tool access. |
| Wall thickness | Ray intersections along both directions of a valid local surface normal, crossing distinct boundary faces of the same closed solid | Measured opposite-skin separation compared with nominal and variation range | Open, self-intersecting, ambiguous, or tangential hits are unknown. This sample is not a global minimum-thickness proof. |

Findings name the sampled face and measured threshold and can display a temporary location marker. They do not yet persist stable per-face finding references across topology changes. A cancelled or invalidated scan cannot publish findings. No result changes source geometry.

## Fastener stacks (INSPECT-14)

The supported workflow uses manually assigned semantic metadata in analysis settings. Shape names are never parsed. `members` entries carry a node ID, role (`bolt`, `washer`, `nut`, or `part`), optional diameter, thickness, hole diameter, and local axis point/direction. The stack settings contain nominal bolt length, optional thread length/tapped depth, clearance range, alignment and angle tolerances, and engagement limits, all in millimetres or degrees. Exactly one bolt and at most one nut are supported. The current settings schema has no versioned imported-metadata format or stable per-hole subshape reference.

| Check | Required metadata | Result |
|---|---|---|
| Diameter fit | Bolt shaft diameter and every hole diameter | Clearance within configured minimum and maximum; missing diameter is incomplete. |
| Alignment | Axis and center for every hole | Radial offset and angular error within tolerances; absent axis is incomplete. |
| Bolt reach | Grip thickness, washer/nut thickness, under-head length | Available length beyond stack; short reach is a failure. |
| Thread engagement | Threaded length, engagement min/max, nut or tapped-hole depth | Engagement range check; missing thread data is incomplete. |

Only generic bolts, washers, nuts, and round holes are supported. Missing required metadata produces explicit incomplete rows, not a pass. There is no standards catalog or certified structural-strength check. Automatic insertion and assembly constraints are outside this analysis.

## Mesh face groups (INSPECT-16)

`Mesh.groups` are render draw ranges with material indices and are **not** semantic face groups. Semantic groups need a separate persisted list of stable IDs, names, colors, and triangle ranges or triangle IDs. Supported importers preserve groups only when the input format exposes them unambiguously. STL has no standard semantic face grouping; an STL import is explicitly ungrouped. A mesh topology edit invalidates prior group membership unless it carries an explicit triangle remap. Retessellating a B-rep does not manufacture semantic mesh groups. Display is temporary, and ungrouped meshes show unavailable grouping.

## Similar component library (INSPECT-17)

The library is an explicit set of node IDs stored in each currently open document's `userData.inspectLibrary`; it is not a persistent browser-wide search index. No remote upload occurs. Each search recomputes descriptors from up to 100 valid open-document candidates, so source edits do not use stale revision hashes. Descriptors use exact guarded solid volume and face area plus **surface-mesh vertex covariance eigenvalues** and an eight-bin radial-distance histogram. Covariance is not physical principal mass inertia. Rigid placement is ignored; scale invariance is an opt-in search setting. Search is cancellable between candidates, ranks by explained size, covariance, and radial-distance terms, and returns up to 20 previews. Opening and inserting a ranked result use the app's existing document and geometry paths. Replacement remains outside scope.

The fixture corpus for relevance evaluation is labeled before implementation: two identical boxes at different rigid placements (`duplicate`), a uniformly scaled box (`similar when scale invariant`), a box with altered aspect ratio (`related`), a cylinder (`dissimilar`), and a sphere (`dissimilar`). Targets: the moved duplicate must rank first; the scaled duplicate must rank above the cylinder in scale-invariant mode; cylinder and sphere must not outrank the altered box. These are bounded retrieval targets, not AI equivalence or a hub-wide search claim.
