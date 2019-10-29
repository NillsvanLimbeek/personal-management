import { shallowMount } from '@vue/test-utils';

import DropdownItem from '../DropdownItem.vue';

const component = (values = {}) => {
    return shallowMount(DropdownItem, {
        propsData: {
            ...values,
        },
    });
};

describe('Dropdown Item', () => {
    const wrapper = component({
        title: 'Test Title',
    });

    it('Renders a dropdown item', () => {
        expect(wrapper.contains('.dropdown-item')).toBe(true);
    });

    it('Renders a title', () => {
        expect(wrapper.find('.dropdown-item__title').text()).toBe('Test Title');
    });
});
