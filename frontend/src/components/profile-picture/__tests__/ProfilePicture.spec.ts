import { shallowMount } from '@vue/test-utils';

import ProfilePicture from '../ProfilePicture.vue';

const factory = (values = {}) => {
    return shallowMount(ProfilePicture, {
        propsData: {
            ...values,
        },
    });
};

describe('Profile Picture', () => {
    const wrapper = factory({});

    it('Renders a profile picture', () => {
        expect(wrapper.contains('.profile-picture')).toBe(true);
    });
});
