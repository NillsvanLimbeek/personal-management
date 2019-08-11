import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';

import { ICommentState, IRootState } from '@data/state';
import { IComment } from '@data/models';

const state: ICommentState = {
    tasks: [],
};

const getters: GetterTree<ICommentState, IRootState> = {};

const mutations: MutationTree<ICommentState> = {};

const actions: ActionTree<ICommentState, IRootState> = {};

export const comments: Module<ICommentState, IRootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
