import { shallowMount, createLocalVue } from '@vue/test-utils';
import date from '@/filters/date/format-date';

import Month from '../Month.vue';

const localVue = createLocalVue();
localVue.filter('date', date);

const component = (values = {}) => {
    return shallowMount(Month, {
        localVue,
        propsData: {
            ...values,
        },
    });
};

describe('Datepicker Month', () => {
    const wrapper = component({
        date: new Date(),
    });

    it('Renders a month', () => {
        expect(wrapper.contains('.month')).toBe(true);
    });

    it('Renders a list of days', () => {
        const days = wrapper.findAll('.month__day');

        expect(days.length).toBeGreaterThanOrEqual(28);
        expect(days.length).toBeLessThanOrEqual(31);
    });
});
