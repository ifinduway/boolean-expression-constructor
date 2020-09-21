/* eslint-disable no-return-assign, no-param-reassign */
import api from '@/api';

export default {
    namespaced: true,

    state: {
        groupsManagePromise: null,
        taskManagePromise: null,
    },

    getters: {
        // isAuthorized: state => !!state.userData,
        // isAuthPending: ({ authPromise }) => !!authPromise,
    },

    mutations: {
        setGroupsManagePromise: (state, value) => state.groupsManagePromise = value,
        setTaskManagePromise: (state, value) => state.taskManagePromise = value,
    },

    actions: {
        async groupAdd({ commit, state }, { name }) {
            const promise = api.Internal.admin.groups.$POST({ name });
            commit('setGroupsManagePromise', promise);

            const { data: { groups } } = await promise;

            if (promise === state.groupsManagePromise) {
                commit('setGroups', groups, { root: true });

                commit('setGroupsManagePromise', null);
                return true;
            }

            return false;
        },

        async taskAdd({ commit, state }, { forGroup, name, description, variants }) {
            const promise = api.Internal.admin.tasks.$POST({ forGroup, name, description, variants });
            commit('setTaskManagePromise', promise);

            const { data: { tasks } } = await promise;

            if (promise === state.taskManagePromise) {
                commit('setTasks', tasks, { root: true });

                commit('setTaskManagePromise', null);
                return true;
            }

            return false;
        },
    },
};
