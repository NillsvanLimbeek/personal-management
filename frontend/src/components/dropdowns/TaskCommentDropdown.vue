<template>
    <div class="task-comment-dropdown">
        <Dropdown position="left">
            <DropdownSection>
                <DropdownItem
                    title="Edit comment"
                    @click="$emit('edit-comment')"
                />
                <DropdownItem
                    title="Delete comment"
                    @click="$emit('delete-comment')"
                />
            </DropdownSection>
        </Dropdown>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    const Dropdown = () => import('@components/dropdown/Dropdown.vue');
    const DropdownSection = () =>
        import('@components/dropdown/dropdown-section/DropdownSection.vue');
    const DropdownItem = () =>
        import('@components/dropdown/dropdown-item/DropdownItem.vue');

    @Component({
        components: {
            Dropdown,
            DropdownSection,
            DropdownItem,
        },
    })
    export default class TaskCommentDropdown extends Vue {}
</script>
