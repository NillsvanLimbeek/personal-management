import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';

import { ITaskSectionState } from '@data/state';

import { ITaskSection, ITaskSectionAddIds } from '@data/models';
import { generateGuid } from '@/utils';

const state: ITaskSectionState = {
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
};

// TODO TaskState, RootState
const getters: GetterTree<ITaskSectionState, any> = {
    getTaskSections: (state) => {
        return state.taskSections;
    },

    getTaskSection: (state, id: string) => {
        return state.taskSections.find((x) => x.id === id);
    },
};

// TODO TaskState
const mutations: MutationTree<ITaskSectionState> = {
    addSection: (state, section: ITaskSection) => {
        state.taskSections.unshift(section);
    },

    addTaskToSection: (state, ids: ITaskSectionAddIds) => {
        const taskSection = state.taskSections.find(
            (x) => x.id === ids.taskSectionId,
        );

        if (taskSection && taskSection.taskIds) {
            taskSection.taskIds.push(ids.taskId);
        }
    },

    updateSection: (state, taskSection: ITaskSection) => {
        let sectionToUpdate = state.taskSections.find(
            (x) => x.id === taskSection.id,
        );

        if (sectionToUpdate) {
            sectionToUpdate = { ...taskSection };
        }
    },

    deleteSection: (state, id: string) => {
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
        }
    },
};

// TODO TaskState, RootState
const actions: ActionTree<ITaskSectionState, any> = {
    async addSection({ commit }, section: ITaskSection) {
        await commit('addSection', section);
    },

    async addTaskToSection({ commit }, ids: ITaskSectionAddIds) {
        await commit('addTaskToSection', ids);
    },

    async updateSection({ commit }, taskSection: ITaskSection) {
        await commit('updateSection', taskSection);
    },

    async deleteSection({ commit }, id: string) {
        await commit('deleteSection', id);
    },

    async duplicateSection({ commit }, id: string) {
        await commit('duplicateSection', id);
    },
};

// TODO TaskState, RootState
export const taskSections: Module<ITaskSectionState, any> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
