import { shallowMount } from '@vue/test-utils';

import BaseInput from '../BaseInput.vue';

const factory = (values = {}) => {
    return shallowMount(BaseInput, {
        propsData: {
            ...values,
        },
    });
};

describe('Base Input', () => {
    const wrapper = factory({
        value: 'Test',
    });

    it('Renders a base input', () => {
        expect(wrapper.contains('.base-input')).toBe(true);
    });

    it('Has a value prop', () => {
        expect(wrapper.props('value')).toBe('Test');
    });
});
