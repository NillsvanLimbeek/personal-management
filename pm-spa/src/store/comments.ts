import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';

import { ICommentState, IRootState } from '@data/state';
import { IComment } from '@data/models';
import { UpdateComment } from '@data/type';

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

    deleteComment: (state, id: string) => {
        state.comments = state.comments.filter((comment) => comment.id !== id);
    },

    updateComment: (state, newComment: UpdateComment) => {
        const index = state.comments
            .map((comment) => comment.id)
            .indexOf(newComment.id);
        const comment = state.comments.find(
            (comment) => comment.id === newComment.id,
        );

        // TODO update comment
        if (comment) {
            // const newComment: IComment = [...comment, ...newComment];
        }
    },
};

const actions: ActionTree<ICommentState, IRootState> = {
    async addComment({ commit }, comment: IComment) {
        await commit('addComment', comment);
    },

    async deleteComment({ commit }, id: string) {
        await commit('deleteComment', id);
    },

    async updateComment({ commit }, newComment: UpdateComment) {
        await commit('updateComment', newComment);
    },
};

export const comments: Module<ICommentState, IRootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
