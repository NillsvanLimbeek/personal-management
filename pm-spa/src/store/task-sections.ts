import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';

import { IRootState, ITaskSectionState } from '@data/state';

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
            sort: 'up',
        },
        {
            id: '537d15b0-bd23-46f3-bcc9-c6749c06aaf3',
            title: 'Section #2',
            taskIds: ['5aa9d99e-f0ca-4ca6-a8ff-eec0c2191efd'],
            isOpen: true,
        },
    ],

    duplicateSectionId: '',
};

const getters: GetterTree<ITaskSectionState, IRootState> = {
    getTaskSections: (state) => {
        return state.taskSections;
    },

    getTaskSection: (state, id: string) => {
        return state.taskSections.find((x) => x.id === id);
    },

    getDuplicateSection: (state) => {
        return state.taskSections.find(
            (x) => x.id === state.duplicateSectionId,
        );
    },
};

const mutations: MutationTree<ITaskSectionState> = {
    addSection: (state, section: ITaskSection) => {
        state.taskSections.unshift(section);
    },

    addTaskToSection: (state, ids: ITaskSectionAddIds) => {
        const section = state.taskSections.find(
            (x) => x.id === ids.taskSectionId,
        );

        if (section && section.taskIds) {
            section.taskIds.push(ids.taskId);
        }
    },

    updateSection: (state, section: ITaskSection) => {
        const index = state.taskSections.map((x) => x.id).indexOf(section.id);
        const sectionToUpdate = state.taskSections.find(
            (x) => x.id === section.id,
        );

        if (sectionToUpdate) {
            // make copy
            const newSection: ITaskSection = { ...sectionToUpdate, ...section };

            // replace section
            state.taskSections.splice(index, 1, newSection);
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
                ...sectionToDuplicate,
                id: generateGuid(),
                title: `Duplicate of ${sectionToDuplicate.title}`,
                taskIds: [],
            };

            state.taskSections.splice(index + 1, 0, newSection);

            // set duplicate id
            state.duplicateSectionId = newSection.id;
        }
    },
};

const actions: ActionTree<ITaskSectionState, IRootState> = {
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

    async duplicateSection({ commit, getters, state }, id: string) {
        await commit('duplicateSection', id);
        return getters.getDuplicateSection;
    },
};

export const taskSections: Module<ITaskSectionState, IRootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
