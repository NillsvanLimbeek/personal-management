import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';

import { IRootState, ITaskState } from '@data/state';
import { ITask, ITaskSectionAddIds } from '@data/models';

import { generateGuid, sortByName, sortByDate } from '@/utils';

const state: ITaskState = {
    tasks: [
        {
            id: '5346d3ca-169f-4584-8710-172d79224d4f',
            title: 'Task #1',
            description: {
                type: 'doc',
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: 'This is Task# 1 ',
                            },
                        ],
                    },
                ],
            },
            completed: false,
            taskSectionId: '60c126ae-2e15-4b0e-aebd-ac2e78e80644',
            dueDate: new Date(),
        },
        {
            id: '6e5e1b1e-faf6-4120-bf4c-091ef2329315',
            title: 'Task #2',
            description: {
                type: 'doc',
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: 'This is Task# 2 ',
                            },
                        ],
                    },
                ],
            },
            completed: true,
            taskSectionId: '60c126ae-2e15-4b0e-aebd-ac2e78e80644',
        },
        {
            id: '5aa9d99e-f0ca-4ca6-a8ff-eec0c2191efd',
            title: 'Task #3',
            description: {
                type: 'doc',
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: 'This is Task# 3 ',
                            },
                        ],
                    },
                ],
            },
            completed: false,
            taskSectionId: '537d15b0-bd23-46f3-bcc9-c6749c06aaf3',
        },
    ],
    duplicateTaskId: '',
};

const getters: GetterTree<ITaskState, IRootState> = {
    getTasks: (state) => {
        return state.tasks;
    },

    getTask: (state, id: string) => {
        return state.tasks.find((x) => x.id === id);
    },

    getDuplicateTaskId: (state) => {
        return state.duplicateTaskId;
    },
};

const mutations: MutationTree<ITaskState> = {
    addTask: (state, task: ITask) => {
        state.tasks.push(task);
    },

    updateTask: (state, task: ITask) => {
        const index = state.tasks.map((x) => x.id).indexOf(task.id);
        const taskToUpdate = state.tasks.find((x) => x.id === task.id);

        if (taskToUpdate) {
            // make copy
            const newTask: ITask = { ...taskToUpdate, ...task };

            // replace task
            state.tasks.splice(index, 1, newTask);
        }
    },

    duplicateTask: (state, ids: ITaskSectionAddIds) => {
        // find task
        const taskToDuplicate = state.tasks.find((x) => x.id === ids.taskId);

        // push task to task array
        if (taskToDuplicate) {
            const newTask = {
                ...taskToDuplicate,
                id: generateGuid(),
                taskSectionId: ids.taskSectionId,
            };

            state.tasks.push(newTask);

            // set duplicate id in state
            state.duplicateTaskId = newTask.id;
        }
    },

    // TODO rename to delete by id
    deleteTask: (state, id: string) => {
        state.tasks = state.tasks.filter((x) => x.id !== id);
    },

    deleteByTaskSectionId: (state, id: string) => {
        state.tasks = state.tasks.filter((x) => x.taskSectionId !== id);
    },

    moveTask: (state, task: ITask) => {
        const taskToMove = state.tasks.find((x) => x.id === task.id);

        if (taskToMove) {
            const newTask = { ...taskToMove, ...task };

            state.tasks = state.tasks.filter((x) => x.id !== taskToMove.id);

            state.tasks.push(newTask);
        }
    },

    saveSortedTasks: (state, tasks: ITask[]) => {
        state.tasks = [...state.tasks, ...tasks];
    },
};

const actions: ActionTree<ITaskState, IRootState> = {
    async addTask({ commit }, task: ITask) {
        await commit('addTask', task);
    },

    async updateTask({ commit }, task: ITask) {
        await commit('updateTask', task);
    },

    async deleteTask({ commit }, id: string) {
        await commit('deleteTask', id);
    },

    async deleteByTaskSectionId({ commit }, id: string) {
        await commit('deleteByTaskSectionId', id);
    },

    async deleteTasks({ commit }, ids: string[]) {
        await ids.forEach((id) => {
            commit('deleteTask', id);
        });
    },

    async duplicateTask({ commit, getters }, ids: ITaskSectionAddIds) {
        await commit('duplicateTask', ids);
        return getters.getDuplicateTaskId;
    },

    async moveTask({ commit }, task: ITask) {
        await commit('moveTask', task);
    },

    async saveSortedTasks({ commit }, tasks: ITask[]) {
        await commit('saveSortedTasks', tasks);
    },
};

export const tasks: Module<ITaskState, IRootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
