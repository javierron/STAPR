"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSdk = exports.GetCallDataDocument = exports.getBuiltGraphSDK = exports.subscribe = exports.execute = exports.getBuiltGraphClient = exports.pollingInterval = exports.createBuiltMeshHTTPHandler = exports.getMeshOptions = exports.rawServeConfig = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("@graphql-mesh/utils");
const utils_2 = require("@graphql-mesh/utils");
const utils_3 = require("@graphql-mesh/utils");
const cache_localforage_1 = tslib_1.__importDefault(require("@graphql-mesh/cache-localforage"));
const fetch_1 = require("@whatwg-node/fetch");
const graphql_1 = tslib_1.__importDefault(require("@graphql-mesh/graphql"));
const merger_bare_1 = tslib_1.__importDefault(require("@graphql-mesh/merger-bare"));
const utils_4 = require("@graphql-mesh/utils");
const plugin_persisted_operations_1 = require("@graphql-yoga/plugin-persisted-operations");
const http_1 = require("@graphql-mesh/http");
const runtime_1 = require("@graphql-mesh/runtime");
const store_1 = require("@graphql-mesh/store");
const cross_helpers_1 = require("@graphql-mesh/cross-helpers");
const importedModule$0 = tslib_1.__importStar(require("./sources/token/introspectionSchema.json"));
const baseDir = cross_helpers_1.path.join(typeof __dirname === 'string' ? __dirname : '/', '..');
const importFn = (moduleId) => {
    const relativeModuleId = (cross_helpers_1.path.isAbsolute(moduleId) ? cross_helpers_1.path.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
    switch (relativeModuleId) {
        case ".graphclient/sources/token/introspectionSchema.json":
            return Promise.resolve(importedModule$0);
        default:
            return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
    }
};
const rootStore = new store_1.MeshStore('.graphclient', new store_1.FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
    fileType: "json",
}), {
    readonly: true,
    validate: false
});
exports.rawServeConfig = undefined;
async function getMeshOptions() {
    const pubsub = new utils_2.PubSub();
    const sourcesStore = rootStore.child('sources');
    const logger = new utils_3.DefaultLogger("GraphClient");
    const cache = new cache_localforage_1.default({
        ...{},
        importFn,
        store: rootStore.child('cache'),
        pubsub,
        logger,
    });
    const sources = [];
    const transforms = [];
    const additionalEnvelopPlugins = [];
    const tokenTransforms = [];
    const additionalTypeDefs = [];
    const tokenHandler = new graphql_1.default({
        name: "token",
        config: { "endpoint": "https://api.studio.thegraph.com/query/77042/token/version/latest" },
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child("token"),
        logger: logger.child("token"),
        importFn,
    });
    sources[0] = {
        name: 'token',
        handler: tokenHandler,
        transforms: tokenTransforms
    };
    const additionalResolvers = [];
    const merger = new merger_bare_1.default({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
    });
    const documentHashMap = {
        "ae3129a4959e51d9c0e64789e14fd348e6ca890d13781cf4465e4d1bd3a65b3f": exports.GetCallDataDocument
    };
    additionalEnvelopPlugins.push((0, plugin_persisted_operations_1.usePersistedOperations)({
        getPersistedOperation(key) {
            return documentHashMap[key];
        },
        ...{}
    }));
    return {
        sources,
        transforms,
        additionalTypeDefs,
        additionalResolvers,
        cache,
        pubsub,
        merger,
        logger,
        additionalEnvelopPlugins,
        get documents() {
            return [
                {
                    document: exports.GetCallDataDocument,
                    get rawSDL() {
                        return (0, utils_4.printWithCache)(exports.GetCallDataDocument);
                    },
                    location: 'GetCallDataDocument.graphql',
                    sha256Hash: 'ae3129a4959e51d9c0e64789e14fd348e6ca890d13781cf4465e4d1bd3a65b3f'
                }
            ];
        },
        fetchFn: fetch_1.fetch,
    };
}
exports.getMeshOptions = getMeshOptions;
function createBuiltMeshHTTPHandler() {
    return (0, http_1.createMeshHTTPHandler)({
        baseDir,
        getBuiltMesh: getBuiltGraphClient,
        rawServeConfig: undefined,
    });
}
exports.createBuiltMeshHTTPHandler = createBuiltMeshHTTPHandler;
let meshInstance$;
exports.pollingInterval = null;
function getBuiltGraphClient() {
    if (meshInstance$ == null) {
        if (exports.pollingInterval) {
            setInterval(() => {
                getMeshOptions()
                    .then(meshOptions => (0, runtime_1.getMesh)(meshOptions))
                    .then(newMesh => meshInstance$.then(oldMesh => {
                    oldMesh.destroy();
                    meshInstance$ = Promise.resolve(newMesh);
                })).catch(err => {
                    console.error("Mesh polling failed so the existing version will be used:", err);
                });
            }, exports.pollingInterval);
        }
        meshInstance$ = getMeshOptions().then(meshOptions => (0, runtime_1.getMesh)(meshOptions)).then(mesh => {
            const id = mesh.pubsub.subscribe('destroy', () => {
                meshInstance$ = undefined;
                mesh.pubsub.unsubscribe(id);
            });
            return mesh;
        });
    }
    return meshInstance$;
}
exports.getBuiltGraphClient = getBuiltGraphClient;
const execute = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));
exports.execute = execute;
const subscribe = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
exports.subscribe = subscribe;
function getBuiltGraphSDK(globalContext) {
    const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
    return getSdk((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
exports.getBuiltGraphSDK = getBuiltGraphSDK;
exports.GetCallDataDocument = (0, utils_1.gql) `
    query GetCallData {
  callDatas(orderBy: id, first: 474) {
    id
    functionName
    params
  }
}
    `;
function getSdk(requester) {
    return {
        GetCallData(variables, options) {
            return requester(exports.GetCallDataDocument, variables, options);
        }
    };
}
exports.getSdk = getSdk;
