import { shallowMount } from '@vue/test-utils';

import SortButton from '../SortButton.vue';

const factory = (values = {}) => {
    return shallowMount(SortButton, {
        propsData: {
            ...values,
        },
    });
};

describe('Sort Button', () => {
    const wrapper = factory({});

    it('Renders a sort button', () => {
        expect(wrapper.contains('.sort-button')).toBe(true);
    });
});
