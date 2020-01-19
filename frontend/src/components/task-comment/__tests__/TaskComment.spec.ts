import { shallowMount } from '@vue/test-utils';

import TaskComment from '../TaskComment.vue';

const component = (values = {}) => {
    return shallowMount(TaskComment, {
        propsData: {
            ...values,
        },
    });
};

describe('Task Comment', () => {
    const wrapper = component({
        comment: {
            createdAt: Date.now(),
            createdBy: 'Nills',
            description:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"This is task #1"}]}]}',
            id: 'Test Id',
            taskId: 'Test Id',
        },
    });

    it('Renders a task comment', () => {
        expect(wrapper.contains('.task-comment')).toBe(true);
    });
});
