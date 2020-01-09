import { mount, createLocalVue } from '@vue/test-utils';
import date from '@/filters/date/format-date';

import Month from '../Month.vue';

// register localVue for filter testing
const localVue = createLocalVue();
localVue.filter('date', date);

const component = (values = {}) => {
    return mount(Month, {
        localVue,
        propsData: {
            ...values,
        },
    });
};

describe('Calendar Month', () => {
    const wrapper = component({
        date: Date.now(),
        tasks: [],
    });

    it('Renders a Month', () => {
        expect(wrapper.contains('.month')).toBe(true);
    });

    it('Renders a list of dates', () => {
        const days = wrapper.findAll('.month__day');

        expect(days.length).toBeGreaterThanOrEqual(28);
        expect(days.length).toBeLessThanOrEqual(31);
    });

    it('Renders a day with a today class', () => {
        expect(wrapper.contains('.month__day--today')).toBe(true);
    });
});
