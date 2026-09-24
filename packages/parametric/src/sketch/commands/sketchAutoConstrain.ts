// Part of the Chili3d Project, under the AGPL-3.0 License.
// See LICENSE file in the project root for full license information.

import { command } from "@chili3d/core";
import type { SketchEditor } from "../editor/sketchEditor";
import { SketchConstraintCommand } from "./sketchConstraints";

@command({ key: "sketch.autoConstrain", icon: "icon-cEqual" })
export class SketchAutoConstrainCommand extends SketchConstraintCommand {
    protected async executeWithEditor(editor: SketchEditor): Promise<void> {
        editor.showDimensionReview();
    }
}
