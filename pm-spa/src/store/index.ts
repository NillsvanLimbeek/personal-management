import Vue from 'vue';
import Vuex from 'vuex';

import { tasks } from './tasks';
import { taskSections } from './task-sections';
import { modals } from './modals';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        tasks,
        taskSections,
        modals,
    },
});

export default store;
