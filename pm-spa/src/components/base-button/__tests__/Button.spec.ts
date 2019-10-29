import { shallowMount } from '@vue/test-utils';

import Button from '../BaseButton.vue';

describe('Button', () => {
    const wrapper = shallowMount(Button, {
        slots: {
            default: '<p class="slot"></p>',
        },
    });

    it('Renders a button', () => {
        expect(wrapper.contains('.button')).toBe(true);
    });

    it('Renders a slot', () => {
        expect(wrapper.find('.slot')).toBeTruthy();
    });
});
