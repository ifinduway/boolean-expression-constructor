/* eslint-disable no-return-assign, no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

import api from '@/api';
import user from './user';
import admin from './admin';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        groups: null,
        tasks: null,

        groupsUpdatePromise: null,
        tasksUpdatePromise: null,
    },

    getters: {
        isGroupsLoaded: state => !!state.groups,
        isTasksLoaded: state => !!state.tasks,

        isGroupsLoading: state => !!state.groupsUpdatePromise,
        isTasksLoading: state => !!state.tasksUpdatePromise,
    },

    mutations: {
        setGroups: (state, value) => state.groups = value,
        setTasks: (state, value) => state.tasks = value,

        setGroupsUpdatePromise: (state, value) => state.groupsUpdatePromise = value,
        setTasksUpdatePromise: (state, value) => state.tasksUpdatePromise = value,
    },

    actions: {
        async loadGroups({ commit, state }) {
            const promise = api.Internal.groups.$GET();
            commit('setGroupsUpdatePromise', promise);

            const { data: { groups } } = await promise;

            if (promise === state.groupsUpdatePromise) {
                commit('setGroups', groups);
                commit('setGroupsUpdatePromise', null);
                return true;
            }

            return false;
        },

        async loadTasks({ commit, state }) {
            const promise = api.Internal.tasks.$GET();
            commit('setTasksUpdatePromise', promise);

            const { data: { tasks } } = await promise;

            if (promise === state.tasksUpdatePromise) {
                commit('setTasks', tasks);
                commit('setTasksUpdatePromise', null);
                return true;
            }

            return false;
        },
    },

    modules: {
        user,
        admin,
    },
});
