import { shallowMount } from '@vue/test-utils';

import Button from '../Button.vue';

describe('Button', () => {
    const wrapper = shallowMount(Button);

    it('Renders a button', () => {
        expect(wrapper.contains('.button')).toBe(true);
    });

    // TODO test for slot
});
