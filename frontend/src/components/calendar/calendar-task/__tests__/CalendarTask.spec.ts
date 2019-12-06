import { shallowMount } from '@vue/test-utils';

import { generateGuid } from '@/utils';

import CalendarTask from '../CalendarTask.vue';

const component = (values = {}) => {
    return shallowMount(CalendarTask, {
        propsData: {
            ...values,
        },
    });
};

describe('Calendar Task', () => {
    const wrapper = component({
        task: {
            id: generateGuid(),
            title: 'Task #1',
            completed: false,
            taskSectionId: generateGuid(),
            comments: [],
        },
    });

    it('Renders a Calendar Task', () => {
        expect(wrapper.contains('.calendar-task')).toBe(true);
    });
});
