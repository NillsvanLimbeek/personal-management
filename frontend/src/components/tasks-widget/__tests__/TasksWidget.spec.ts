import { shallowMount } from '@vue/test-utils';

import TasksWidget from '../TasksWidget.vue';

const factory = (values = {}) => {
    return shallowMount(TasksWidget, {
        propsData: {
            ...values,
        },
    });
};

describe('Tasks Widget', () => {
    const wrapper = factory({
        widgetData: {
            title: 'Test Data',
            stroke: '5',
            progressRing: {
                totalTasks: 10,
                completedTasks: 5,
                percent: 50,
            },
            tasks: [],
        },
    });

    it('Renders a tasks widget', () => {
        expect(wrapper.contains('.tasks-widget')).toBe(true);
    });

    it('Has a widget data prop', () => {
        expect(wrapper.props('widgetData')).toBeTruthy();
    });
});
