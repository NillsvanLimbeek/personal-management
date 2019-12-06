import { mount, createLocalVue } from '@vue/test-utils';
import date from '@/filters/date/format-date';

import Calendar from '../Calendar.vue';

// register localVue for filter testing
const localVue = createLocalVue();
localVue.filter('date', date);

const component = (values = {}) => {
    return mount(Calendar, {
        localVue,
        propsData: {
            ...values,
        },
    });
};

describe('Calendar', () => {
    const wrapper = component({});

    it('Renders a calendar', () => {
        expect(wrapper.contains('.calendar')).toBe(true);
    });

    it('Renders a list of dates', () => {
        const days = wrapper.findAll('.calendar__day');

        expect(days.length).toBeGreaterThanOrEqual(28);
        expect(days.length).toBeLessThanOrEqual(31);
    });

    it('Renders a day with a today class', () => {
        expect(wrapper.contains('.calendar__day--today')).toBe(true);
    });
});
