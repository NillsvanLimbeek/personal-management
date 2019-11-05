import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';

import { IRootState, ITaskState } from '@data/state';
import { ITask, ITaskSectionAddIds } from '@data/models';
import { AddComment } from '@data/type';

import { generateGuid } from '@/utils';
import { toDate } from 'date-fns';

const state: ITaskState = {
    tasks: [
        {
            id: '5346d3ca-169f-4584-8710-172d79224d4f',
            title: 'Task #1',
            description:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"This is task #1"}]}]}',
            completed: false,
            taskSectionId: '60c126ae-2e15-4b0e-aebd-ac2e78e80644',
            dueDate: new Date(),
            comments: [],
        },
        {
            id: '6e5e1b1e-faf6-4120-bf4c-091ef2329315',
            title: 'Task #2',
            description:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"This is task #2"}]}]}',
            completed: true,
            taskSectionId: '60c126ae-2e15-4b0e-aebd-ac2e78e80644',
            comments: [],
        },
        {
            id: '5aa9d99e-f0ca-4ca6-a8ff-eec0c2191efd',
            title: 'Task #3',
            description:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"This is task #2"}]}]}',
            completed: false,
            taskSectionId: '537d15b0-bd23-46f3-bcc9-c6749c06aaf3',
            comments: [],
        },
    ],
    duplicateTaskId: '',
};

const getters: GetterTree<ITaskState, IRootState> = {
    getTasks: (state) => {
        return state.tasks;
    },

    getTask: (state, id: string) => {
        return state.tasks.find((task) => task.id === id);
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
        const index = state.tasks.map((task) => task.id).indexOf(task.id);
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
        const taskToDuplicate = state.tasks.find(
            (task) => task.id === ids.taskId,
        );

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

    deleteById: (state, id: string) => {
        state.tasks = state.tasks.filter((task) => task.id !== id);
    },

    deleteByTaskSectionId: (state, id: string) => {
        state.tasks = state.tasks.filter((task) => task.taskSectionId !== id);
    },

    moveTask: (state, task: ITask) => {
        const taskToMove = state.tasks.find((x) => x.id === task.id);

        if (taskToMove) {
            const newTask = { ...taskToMove, ...task };

            state.tasks = state.tasks.filter(
                (task) => task.id !== taskToMove.id,
            );

            state.tasks.push(newTask);
        }
    },

    saveSortedTasks: (state, tasks: ITask[]) => {
        state.tasks = [...state.tasks, ...tasks];
    },

    addCommentId: (state, { taskId, commentId }: AddComment) => {
        const task = state.tasks.find((task) => task.id === taskId);

        if (task) {
            task.comments.push(commentId);
        }
    },

    deleteCommentId: (state, { taskId, commentId }: AddComment) => {
        const task = state.tasks.find((task) => task.id === taskId);

        if (task) {
            task.comments = task.comments.filter(
                (comment) => comment !== commentId,
            );
        }
    },

    setNewOrder: (state, newOrder: ITask[]) => {
        state.tasks = newOrder;
        console.log(state.tasks);
    },
};

const actions: ActionTree<ITaskState, IRootState> = {
    async addTask({ commit }, task: ITask) {
        await commit('addTask', task);
    },

    async updateTask({ commit }, task: ITask) {
        await commit('updateTask', task);
    },

    async deleteById({ commit }, id: string) {
        await commit('deleteById', id);
    },

    async deleteByTaskSectionId({ commit }, id: string) {
        await commit('deleteByTaskSectionId', id);
    },

    async deleteTasks({ commit }, ids: string[]) {
        await ids.forEach((id) => {
            commit('deleteById', id);
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

    async addCommentId({ commit }, comment: AddComment) {
        await commit('addCommentId', comment);
    },

    async deleteCommentId({ commit }, comment: AddComment) {
        await commit('deleteCommentId', comment);
    },

    async setNewOrder({ commit }, newOrder: ITask[]) {
        await commit('setNewOrder', newOrder);
    },
};

export const tasks: Module<ITaskState, IRootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
