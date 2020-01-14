import { mount, createLocalVue } from '@vue/test-utils';

import Calendar from '../Calendar.vue';

const component = (values = {}) => {
    return mount(Calendar, {
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
});
