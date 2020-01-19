import { shallowMount } from '@vue/test-utils';

import SearchBar from '../SearchBar.vue';

const factory = (values = {}) => {
    return shallowMount(SearchBar, {
        propsData: {
            ...values,
        },
    });
};

describe('Search Bar', () => {
    const wrapper = factory({});

    it('Renders a search bar', () => {
        expect(wrapper.contains('.search-bar')).toBe(true);
    });
});
