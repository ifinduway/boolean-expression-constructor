import axios from 'axios';
import HTTPMethods from './HTTPMethods';

export default {
    getClient: ({ origin }) => axios.create({ baseURL: origin }),

    getClientCallProviderForMethod: ({ client: axiosInstance, method }) => ({
        [HTTPMethods.GET]: axiosInstance.get,
        [HTTPMethods.HEAD]: axiosInstance.head,
        [HTTPMethods.POST]: axiosInstance.post,
        [HTTPMethods.PUT]: axiosInstance.put,
        [HTTPMethods.DELETE]: axiosInstance.delete,
        [HTTPMethods.CONNECT]: axiosInstance.connect,
        [HTTPMethods.OPTIONS]: axiosInstance.options,
        [HTTPMethods.TRACE]: axiosInstance.trace,
    })[method],

    fire: ({ handler, relativeURI, payload }) => handler(relativeURI, ...payload),
};
