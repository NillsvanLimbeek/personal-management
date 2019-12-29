import { shallowMount } from '@vue/test-utils';

import InlineEdit from '../InlineEdit.vue';

const factory = (values = {}) => {
    return shallowMount(InlineEdit, {
        propsData: {
            ...values,
        },
    });
};

describe('Inline Edit', () => {
    const wrapper = factory({
        title: 'Test title',
    });

    it('Renders a inline edit', () => {
        expect(wrapper.contains('.inline-edit')).toBe(true);
    });

    it('Renders a title', () => {
        expect(wrapper.props('title')).toBe('Test title');
    });
});
