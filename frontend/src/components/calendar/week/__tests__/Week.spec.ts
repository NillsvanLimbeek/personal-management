import { mount, createLocalVue } from '@vue/test-utils';
import date from '@/filters/date/format-date';

import Week from '../Week.vue';

// register localVue for filter testing
const localVue = createLocalVue();
localVue.filter('date', date);

const component = (values = {}) => {
    return mount(Week, {
        localVue,
        propsData: {
            ...values,
        },
    });
};

describe('Calendar Week', () => {
    const wrapper = component({
        date: Date.now(),
        tasks: [],
    });

    it('Renders a Week', () => {
        expect(wrapper.contains('.week')).toBe(true);
    });

    it('Renders a list of dates', () => {
        const days = wrapper.findAll('.week__day');

        expect(days.length).toBe(7);
    });

    it('Renders a day with a today class', () => {
        expect(wrapper.contains('.week__day--today')).toBe(true);
    });
});
