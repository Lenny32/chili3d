// Part of the Chili3d Project, under the AGPL-3.0 License.
// See LICENSE file in the project root for full license information.

import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { initPlaneGcs } from "../../src/sketch/planegcs";

// Load the PlaneGCS constraint-solver WASM from bytes for node tests.
const require = createRequire(import.meta.url);
await initPlaneGcs(readFileSync(require.resolve("@salusoft89/planegcs/dist/planegcs_dist/planegcs.wasm")));
