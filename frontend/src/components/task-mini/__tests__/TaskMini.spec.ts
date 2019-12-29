import { shallowMount } from '@vue/test-utils';

import TaskMini from '../TaskMini.vue';

const factory = (values = {}) => {
    return shallowMount(TaskMini, {
        propsData: {
            ...values,
        },
    });
};

describe('Tasks Widget', () => {
    const wrapper = factory({
        task: {
            id: 1,
            title: 'Task 1',
            completed: true,
            taskSectionId: 1,
            comments: [],
        },
    });

    it('Renders a task mini', () => {
        expect(wrapper.contains('.task-mini')).toBe(true);
    });
});
