import { shallowMount } from '@vue/test-utils';

import TextEditor from '../TextEditor.vue';

const factory = (values: {}) => {
    return shallowMount(TextEditor, {
        propsData: {
            ...values,
        },
    });
};

describe('Text Editor', () => {
    const wrapper = factory({});

    it('Renders a text editor', () => {
        expect(wrapper.contains('.text-editor')).toBe(true);
    });

    it('Contains a editor component', () => {
        expect(wrapper.contains('.text-editor__editor')).toBe(true);
    });
});
