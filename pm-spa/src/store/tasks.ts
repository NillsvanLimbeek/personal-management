import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';

import { ITaskState } from '@data/state';
import { TaskTab } from '@data/type';

import { ITaskSection, ITask } from '@/data/models';
import { generateGuid } from '@/utils';

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
    taskSections: [
        {
            id: '60c126ae-2e15-4b0e-aebd-ac2e78e80644',
            title: 'Section #1',
            taskIds: [
                '5346d3ca-169f-4584-8710-172d79224d4f',
                '6e5e1b1e-faf6-4120-bf4c-091ef2329315',
            ],
            isOpen: true,
        },
        {
            id: '537d15b0-bd23-46f3-bcc9-c6749c06aaf3',
            title: 'Section #2',
            taskIds: ['5aa9d99e-f0ca-4ca6-a8ff-eec0c2191efd'],
            isOpen: true,
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

    getTaskSection: (state, id: string) => {
        return state.taskSections.find((x) => x.id === id);
    },
};

// TODO TaskState
const mutations: MutationTree<ITaskState> = {
    setCurrentTab: (state, tab: TaskTab) => {
        state.currentTab = tab;
    },

    addSection: (state, section: ITaskSection) => {
        state.taskSections.unshift(section);
    },

    addTask: (state, task: ITask) => {
        state.tasks.push(task);
    },

    updateSection: (state, taskSection: ITaskSection) => {
        let sectionToUpdate = state.taskSections.find(
            (x) => x.id === taskSection.id,
        );

        if (sectionToUpdate) {
            sectionToUpdate = { ...taskSection };
        }
    },

    updateTask: (state, task: ITask) => {
        let taskToUpdate = state.tasks.find((x) => x.id === task.id);

        if (taskToUpdate) {
            taskToUpdate = { ...task };
        }
    },

    deleteSection: (state, id: string) => {
        // delete tasks
        state.tasks = state.tasks.filter((x) => x.taskSectionId !== id);

        // delete section
        state.taskSections = state.taskSections.filter((x) => x.id !== id);
    },

    duplicateSection: (state, id: string) => {
        // section to duplicate
        const sectionToDuplicate = state.taskSections.find((x) => x.id === id);

        // find index of section
        const index: number = state.taskSections.map((x) => x.id).indexOf(id);

        // make copy and put in array after the original
        if (sectionToDuplicate) {
            const newSection: ITaskSection = {
                id: generateGuid(),
                title: `Duplicate of ${sectionToDuplicate.title}`,
                taskIds: [],
                isOpen: true,
            };

            state.taskSections.splice(index + 1, 0, newSection);

            // add tasks to new section
        }
    },
};

// TODO TaskState, RootState
const actions: ActionTree<ITaskState, any> = {
    async setCurrentTab({ commit }, tab: TaskTab) {
        await commit('setCurrentTab', tab);
    },

    async addSection({ commit }, section: ITaskSection) {
        await commit('addSection', section);
    },

    async addTask({ state, commit }, task: ITask) {
        const taskSection = await state.taskSections.find(
            (x) => x.id === task.taskSectionId,
        );

        if (taskSection && taskSection.taskIds) {
            taskSection.taskIds.push(task.taskSectionId);
        }

        await commit('addTask', task);
    },

    async updateSection({ commit }, taskSection: ITaskSection) {
        await commit('updateSection', taskSection);
    },

    async updateTask({ commit }, task: ITask) {
        await commit('updateTask', task);
    },

    async deleteSection({ commit }, id: string) {
        await commit('deleteSection', id);
    },

    async duplicateSection({ commit }, id: string) {
        await commit('duplicateSection', id);
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
