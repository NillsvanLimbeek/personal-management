import { mount, createLocalVue } from '@vue/test-utils';
import { clickOutside } from '@/directives/click-outside';

import Datepicker from '../Datepicker.vue';

// create a localVue to register directive
const localVue = createLocalVue();
localVue.directive('click-outside', clickOutside);

const component = (values = {}) => {
    return mount(Datepicker, {
        propsData: {
            ...values,
        },
    });
};

describe('Datepicker', () => {
    const wrapper = component({
        date: new Date(),
    });

    it('Renders a datepicker', () => {
        expect(wrapper.contains('.datepicker')).toBe(true);
    });
});
