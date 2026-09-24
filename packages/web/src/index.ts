// Part of the Chili3d Project, under the AGPL-3.0 License.
// See LICENSE file in the project root for full license information.

import { bridgeUrlFor, loadMcpSettings } from "@chili3d/ai";
import { AppBuilder } from "@chili3d/builder";
import { type IApplication, Logger } from "@chili3d/core";
import { Loading } from "./loading";
import { parseStartupParams } from "./startupParams";

const loading = new Loading();
document.body.appendChild(loading);

async function handleApplicaionBuilt(app: IApplication) {
    document.body.removeChild(loading);

    const { plugins, fileUrl, mcpUrl } = parseStartupParams(window.location.search);
    const mcpSettings = loadMcpSettings();
    if (mcpUrl || mcpSettings.autoConnect) {
        // Loaded on demand: the MCP SDK is a sizeable chunk only bridge sessions need.
        import("@chili3d/ai/src/mcp")
            .then((mcp) => mcp.connectMcpBridge(mcpUrl ?? bridgeUrlFor(mcpSettings)))
            .catch((err) => Logger.error(`[mcp] failed to start: ${err}`));
    }
    for (const plugin of plugins) {
        Logger.info(`loading plugin from: ${plugin}`);
        await app.pluginManager.loadFromUrl(plugin);
    }
    if (fileUrl) {
        Logger.info(`loading file from: ${fileUrl}`);
        await app.loadFileFromUrl(fileUrl);
    }
}

// prettier-ignore
new AppBuilder()
    .useIndexedDB()
    .useWasmOcc()
    .useParametric()
    .useThree()
    .useUI()
    .build()
    .then(handleApplicaionBuilt)
    .catch((err) => {
        alert(err.message);
    });
