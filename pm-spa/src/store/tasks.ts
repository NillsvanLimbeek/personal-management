import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';

import { ITaskState } from '@data/state';

import { ITask } from '@data/models';

const state: ITaskState = {
    tasks: [
        {
            id: '5346d3ca-169f-4584-8710-172d79224d4f',
            title: 'Task #1',
            description: 'This is task one',
            completed: false,
            taskSectionId: '60c126ae-2e15-4b0e-aebd-ac2e78e80644',
        },
        {
            id: '6e5e1b1e-faf6-4120-bf4c-091ef2329315',
            title: 'Task #2',
            description: 'This is task two',
            completed: true,
            taskSectionId: '60c126ae-2e15-4b0e-aebd-ac2e78e80644',
        },
        {
            id: '5aa9d99e-f0ca-4ca6-a8ff-eec0c2191efd',
            title: 'Task #3',
            description: 'This is task three',
            completed: false,
            taskSectionId: '537d15b0-bd23-46f3-bcc9-c6749c06aaf3',
        },
    ],
};

// TODO RootState
const getters: GetterTree<ITaskState, any> = {
    getTasks: (state) => {
        return state.tasks;
    },
};

const mutations: MutationTree<ITaskState> = {
    addTask: (state, task: ITask) => {
        state.tasks.push(task);
    },

    updateTask: (state, task: ITask) => {
        let taskToUpdate = state.tasks.find((x) => x.id === task.id);

        if (taskToUpdate) {
            taskToUpdate = { ...task };
        }
    },

    deleteTask: (state, id: string) => {
        state.tasks = state.tasks.filter((x) => x.id !== id);
    },
};

// TODO RootState
const actions: ActionTree<ITaskState, any> = {
    async addTask({ commit }, task: ITask) {
        await commit('addTask', task);
    },

    async updateTask({ commit }, task: ITask) {
        await commit('updateTask', task);
    },

    async deleteTask({ commit }, id: string) {
        await commit('deleteTask', id);
    },
};

// TODO RootState
export const tasks: Module<ITaskState, any> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
