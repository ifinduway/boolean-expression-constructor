import Endpoint from './Endpoint';
import HTTPMethods from './HTTPMethods';
import debugLog from './debugLog';

import AxiosClientProvider from './AxiosClientProvider';

const CHAIN = Symbol('APIController:CallChain');
const BUFFER = Symbol('APIController:VariableComponentValueBuffer');

function uriComponentIsVariable(key) {
    return key[0] === '$';
}

// TODO@IcePeachTea: support fire configuration as Endpoint
// TODO@IcePeachTea: reinforse abort with fireUID(Promise or custom UID) check
// TODO@IcePeachTea: SingletonePool on to of custom ClientAbortionProvider
function buildEndpoint({
    target, methodName, method, origin, path, config,
}, {
    requestClient, getClientCallProviderForMethod, fire,
}, apiName) {
    const clientEndpointCall = getClientCallProviderForMethod({
        client: requestClient, methodName, method, origin, path, config,
    });

    return (...payload) => {
        const relativeURI = target[CHAIN].join('/');
        const URI = `${origin}${target[CHAIN].join('/')}`;

        // debugLog.fire({ apiName, path, payload });

        // TODO@IcePeachTea: return mapped object from Promise
        // TODO@IcePeachTea: { aborted, response }
        return fire({
            handler: clientEndpointCall, URI, relativeURI, payload,
        })
            .then((response) => {
                debugLog.response({ apiName, path, response });

                return response;
            })
            .catch((error) => {
                debugLog.error({ apiName, path, error });

                throw error;
            });
    };
}

function reduceEndpointsIn(target, origin, reduce, path = []) {
    Object.entries(target).forEach(([key, value]) => {
        if (value && typeof (value) === 'object') {
            Object.defineProperty(value, CHAIN, {
                get: uriComponentIsVariable(key)
                    // eslint-disable-next-line func-names
                    ? function () { return [...target[CHAIN], this[BUFFER]]; }
                    // eslint-disable-next-line func-names
                    : function () { return [...target[CHAIN], key]; },
            });

            reduceEndpointsIn(value, origin, reduce, [...path, key]);

            if (uriComponentIsVariable(key)) {
                Object.defineProperty(value, BUFFER, { writable: true });
                // eslint-disable-next-line no-param-reassign
                target[key] = (v) => {
                    // eslint-disable-next-line no-param-reassign
                    value[BUFFER] = v;
                    return value;
                };
            }
        }
    });

    Object.getOwnPropertySymbols(target)
        .filter(e => Object.values(HTTPMethods).includes(e))
        .forEach((x) => {
            const [methodName, method] = Object.entries(HTTPMethods).find(([, value]) => value === x);

            // eslint-disable-next-line no-param-reassign
            target[`$${methodName}`] = reduce({
                target,
                method,
                methodName,
                origin,
                path,
                config: target[x],
            });

            // eslint-disable-next-line no-param-reassign
            delete target[x];
        });
}

function reduceEndpoints(routsMap, origin, reduce) {
    // eslint-disable-next-line no-param-reassign
    routsMap = {
        ...routsMap,
        get [CHAIN]() { return []; },
    };
    reduceEndpointsIn(routsMap, origin, reduce);
}

export default function creareAPIProvider(name, APIDescriptor, { getClient, ...clientProvider } = AxiosClientProvider) {
    const { Routes: routsMap, ORIGIN: origin } = APIDescriptor(Endpoint, HTTPMethods);
    const requestClient = getClient({ origin });

    reduceEndpoints(
        routsMap,
        origin,
        blueprint => buildEndpoint(blueprint, { requestClient, ...clientProvider }, name),
    );

    return routsMap;
}
