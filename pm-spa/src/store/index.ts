import Vue from 'vue';
import Vuex from 'vuex';

import { tasks } from './tasks';
import { taskSections } from './task-sections';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        tasks,
        taskSections,
    },
});

export default store;
