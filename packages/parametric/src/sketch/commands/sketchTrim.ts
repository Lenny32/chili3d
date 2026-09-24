// Part of the Chili3d Project, under the AGPL-3.0 License.
// See LICENSE file in the project root for full license information.

import { command } from "@chili3d/core";
import { SketchGeometryCommand } from "./sketchGeometryCommand";

@command({ key: "sketch.trim", icon: "icon-trim" })
export class SketchTrimCommand extends SketchGeometryCommand {
    protected readonly operation = "trim";
}
