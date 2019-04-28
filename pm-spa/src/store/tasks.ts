import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';

import { ITaskState } from '@data/state';
import { TaskTab } from '@data/type';

const state: ITaskState = {
    tasks: [
        {
            id: 1,
            title: 'Task #1',
            description: 'This is task one',
            completed: false,
            taskSectionId: 1,
        },
        {
            id: 2,
            title: 'Task #2',
            description: 'This is task two',
            completed: true,
            taskSectionId: 1,
        },
        {
            id: 3,
            title: 'Task #3',
            description: 'This is task three',
            completed: false,
            taskSectionId: 2,
        },
    ],
    taskSections: [
        {
            id: 1,
            title: 'Section #1',
            taskIds: [1, 2],
        },
        {
            id: 2,
            title: 'Section #2',
            taskIds: [3],
        },
    ],
    currentTab: 'list',
};

// TODO TaskState, RootState
const getters: GetterTree<ITaskState, any> = {
    getCurrentTab: (state) => {
        return state.currentTab;
    },

    getTasks: (state) => {
        return state.tasks;
    },

    getTaskSections: (state) => {
        return state.taskSections;
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
