import { mount } from '@vue/test-utils';

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

    it('Renders a Calendar', () => {
        expect(wrapper.contains('.calendar')).toBe(true);
    });

    // it('Renders a list of dates', () => {
    //     expect(wrapper.)
    // })
});
