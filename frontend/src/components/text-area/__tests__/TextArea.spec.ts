import { shallowMount } from '@vue/test-utils';

import TextArea from '../TextArea.vue';

const factory = (values = {}) => {
    return shallowMount(TextArea, {
        propsData: {
            ...values,
        },
    });
};

describe('Text Area', () => {
    const wrapper = factory({
        title: 'Test Title',
    });

    it('Renders a text area', () => {
        expect(wrapper.contains('.text-area')).toBe(true);
    });

    it('Has a title prop', () => {
        expect(wrapper.props('title')).toBe('Test Title');
    });
});
