import { shallowMount } from '@vue/test-utils';

import TaskSectionsWidget from '../TaskSectionsWidget.vue';

const component = (values = {}) => {
    return shallowMount(TaskSectionsWidget, {
        propsData: {
            ...values,
        },
    });
};

describe('Task Sections Widget', () => {
    const wrapper = component({
        taskSections: [],
        tasks: [],
    });

    it('Renders a task sections widget', () => {
        expect(wrapper.contains('.task-sections-widget')).toBe(true);
    });
});
