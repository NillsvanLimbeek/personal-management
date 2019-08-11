import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';

import { ICommentState, IRootState } from '@data/state';
import { IComment } from '@data/models';

const state: ICommentState = {
    comments: [],
};

const getters: GetterTree<ICommentState, IRootState> = {
    getComments: (state) => {
        return state.comments;
    },

    getComment: (state, id: string) => {
        return state.comments.find((comment) => comment.id === id);
    },
};

const mutations: MutationTree<ICommentState> = {
    addComment: (state, comment: IComment) => {
        state.comments.push(comment);
    },
};

const actions: ActionTree<ICommentState, IRootState> = {
    async addComment({ commit }, comment: IComment) {
        await commit('addComment', comment);
    },
};

export const comments: Module<ICommentState, IRootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
