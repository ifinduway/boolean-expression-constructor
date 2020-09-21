/* eslint-disable no-return-assign, no-param-reassign */
import api from '@/api';

export default {
    namespaced: true,

    state: {
        userData: null,

        authPromise: null,
    },

    getters: {
        isAuthorized: state => !!state.userData,
        isAuthPending: ({ authPromise }) => !!authPromise,
    },

    mutations: {
        setUserData: (state, value) => state.userData = value,
        setAuthPromise: (state, value) => state.authPromise = value,
        setUserPresets: (state, value) => state.userData = { ...state.userData, preset: value },
    },

    actions: {
        async auth({ commit, state }) {
            const promise = api.Internal.user.auth.$GET();
            commit('setAuthPromise', promise);

            const { data: { user } } = await promise;

            if (promise === state.authPromise) {
                commit('setUserData', user);
                commit('setAuthPromise', null);
                return true;
            }

            return false;
        },

        async login({ commit, state }, userData) {
            const promise = api.Internal.user.login.$POST(userData);
            commit('setAuthPromise', promise);

            const { data: { user } } = await promise;

            if (promise === state.authPromise) {
                commit('setUserData', user);
                commit('setAuthPromise', null);
                return true;
            }

            return false;
        },

        async register({ commit, state }, userData) {
            const promise = api.Internal.user.register.$POST(userData);
            commit('setAuthPromise', promise);

            const { data: { user } } = await promise;

            if (promise === state.authPromise) {
                commit('setUserData', user);
                commit('setAuthPromise', null);
                return true;
            }

            return false;
        },

        async logout({ commit, state }, userData) {
            const promise = api.Internal.user.logout.$POST(userData);
            commit('setAuthPromise', promise);

            const { data: { success } } = await promise;

            if (promise === state.authPromise) {
                commit('setUserData', null);
                commit('setAuthPromise', null);
                return true;
            }

            return false;
        },

        async presetAdd({ commit, state }, preset) {
            const promise = api.Internal.user.presets.$PUT(preset);
            const { data: { presets } } = await promise;
            commit('setUserPresets', presets);
        },
    },
};
