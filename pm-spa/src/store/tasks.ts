import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';

import { ITaskState } from '@data/state';
import { TaskTab } from '@data/type';

const state: ITaskState = {
    currentTab: 'list',
};

// TODO TaskState, RootState
const getters: GetterTree<ITaskState, any> = {
    getCurrentTab: (state) => {
        return state.currentTab;
    },
};

// TODO TaskState
const mutations: MutationTree<ITaskState> = {
    setCurrentTab: (state, tab: TaskTab) => {
        state.currentTab = tab;
    },
};

// TODO TaskState, RootState
const actions: ActionTree<ITaskState, any> = {
    setCurrentTab({ commit }, tab: TaskTab) {
        commit('setCurrentTab', tab);
    },
};

// TODO TaskState, RootState
export const tasks: Module<ITaskState, any> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
