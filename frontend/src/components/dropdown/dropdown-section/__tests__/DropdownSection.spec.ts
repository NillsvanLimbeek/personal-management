import { shallowMount } from '@vue/test-utils';

import DropdownSection from '../DropdownSection.vue';

const component = (values = {}) => {
    return shallowMount(DropdownSection, {
        propsData: {
            ...values,
        },
    });
};

describe('Dropdown Section', () => {
    const wrapper = component({
        slots: {
            default: '<p class="slot">Test Slot</p>',
        },
    });

    it('Renders a dropdown section', () => {
        expect(wrapper.contains('.dropdown-section')).toBe(true);
    });

    it('Renders a slot', () => {
        expect(wrapper.find('.slot')).toBeTruthy();
    });
});
