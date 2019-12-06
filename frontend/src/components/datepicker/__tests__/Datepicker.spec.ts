import { mount } from '@vue/test-utils';

import Datepicker from '../Datepicker.vue';

const component = (values = {}) => {
    return mount(Datepicker, {
        propsData: {
            ...values,
        },
    });
};

describe('Datepicker', () => {
    const wrapper = component({
        date: new Date(),
    });

    it('Renders a datepicker', () => {
        expect(wrapper.contains('.datepicker')).toBe(true);
    });
});
