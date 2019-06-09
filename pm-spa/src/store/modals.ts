import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';

import { IRootState, IModalsState } from '@data/state';

const state: IModalsState = {
    open: false,
};

const getters: GetterTree<IModalsState, IRootState> = {
    getOpen: (state) => {
        return state.open;
    },
};

const mutations: MutationTree<IModalsState> = {
    toggleModal: (state, toggle: boolean) => {
        state.open = toggle;
    },
};

const actions: ActionTree<IModalsState, IRootState> = {
    toggleModal({ commit }, toggle: boolean) {
        commit('toggleModal', toggle);
    },
};

export const modals: Module<IModalsState, IRootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
