import Vue from 'vue';
import Vuex from 'vuex';

import { tasks } from './tasks';
import { taskSections } from './task-sections';
import { comments } from './comments';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        tasks,
        taskSections,
        comments,
    },
});

export default store;
