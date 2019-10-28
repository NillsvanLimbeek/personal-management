import { shallowMount, createLocalVue } from '@vue/test-utils';
import { clickOutside } from '@/directives/click-outside';

import Dropdown from '../Dropdown.vue';

// create a localVue to register directive
const localVue = createLocalVue();
localVue.directive('click-outside', clickOutside);

const component = (values = {}) => {
    return shallowMount(Dropdown, {
        localVue,
        propsData: {
            ...values,
        },
    });
};

describe('Dropdown', () => {
    const wrapper = component({
        slots: {
            default: '<p class="slot">Test</p>',
        },
        position: 'left',
    });

    it('Renders a dropdown', () => {
        expect(wrapper.contains('.dropdown')).toBe(true);
    });

    it('Renders a slot', () => {
        expect(wrapper.find('.slot')).toBeTruthy();
    });
});
