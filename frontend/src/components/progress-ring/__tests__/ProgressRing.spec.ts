import { shallowMount } from '@vue/test-utils';

import ProgressRing from '../ProgressRing.vue';

const factory = (values = {}) => {
    return shallowMount(ProgressRing, {
        propsData: {
            ...values,
        },
    });
};

describe('Progress Ring', () => {
    const wrapper = factory({
        taskData: {
            totalTasks: 2,
            completedTasks: 1,
            percent: 50,
        },
    });

    it('Renders a progress ring', () => {
        expect(wrapper.contains('.progress-ring')).toBe(true);
    });
});
