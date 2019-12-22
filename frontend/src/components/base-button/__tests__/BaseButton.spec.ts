import { shallowMount } from '@vue/test-utils';

import BaseButton from '../BaseButton.vue';

describe('Base Button', () => {
    const wrapper = shallowMount(BaseButton, {
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
