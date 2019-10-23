import { shallowMount } from '@vue/test-utils';

import Checkbox from '../Checkbox.vue';

const component = (values = {}) => {
    return shallowMount(Checkbox, {
        propsData: {
            ...values,
        },
    });
};

describe('Checkbox', () => {
    it('Renders a checkbox', () => {
        const wrapper = component({
            active: false,
        });

        expect(wrapper.contains('.checkbox')).toBe(true);
    });

    it('Renders an active checkbox', () => {
        const wrapper = component({
            active: true,
        });

        expect(wrapper.contains('.checkbox--active')).toBe(true);
    });
});
