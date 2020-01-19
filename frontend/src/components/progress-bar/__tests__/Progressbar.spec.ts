import { shallowMount } from '@vue/test-utils';

import ProgressBar from '../ProgressBar.vue';

const factory = (values = {}) => {
    return shallowMount(ProgressBar, {
        propsData: {
            ...values,
        },
    });
};

describe('Progress Bar', () => {
    const wrapper = factory({
        sectionData: {
            title: 'Test Progress Bar',
            stroke: 'white',
            progressRing: { totalTasks: 2, completedTasks: 1, percent: 50 },
            tasks: [],
        },
    });

    it('Renders a progress bar', () => {
        expect(wrapper.contains('.progress-bar')).toBe(true);
    });
});
