<template>
    <div class="task-section-dropdown">
        <Dropdown
            class="task-section__dropdown"
            :class="{ 'task-section__dropdown--hide': !isOpen }"
        >
            <DropdownSection>
                <DropdownItem
                    title="Collapse section"
                    @click="$emit('collapse-section')"
                />
                <DropdownItem
                    title="Mark all as complete"
                    @click="$emit('complete-tasks')"
                />
            </DropdownSection>

            <DropdownSection>
                <DropdownItem
                    title="Duplicate section"
                    @click="$emit('duplicate-section')"
                />
                <DropdownItem
                    title="Move all tasks to"
                    :disabled="true"
                />
            </DropdownSection>

            <DropdownSection>
                <DropdownItem
                    title="Rename section"
                    @click="$emit('rename-section')"
                />
            </DropdownSection>

            <DropdownSection :last-section="true">
                <DropdownItem
                    title="Delete section"
                    @click="$emit('delete-section')"
                />
            </DropdownSection>
        </Dropdown>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    const Dropdown = () => import('@components/dropdown/Dropdown.vue');
    const DropdownSection = () =>
        import('@components/dropdown/DropdownSection.vue');
    const DropdownItem = () => import('@components/dropdown/DropdownItem.vue');

    @Component({
        components: {
            Dropdown,
            DropdownSection,
            DropdownItem,
        },
    })
    export default class TaskSectionDropdown extends Vue {
        @Prop({ required: true }) private isOpen!: boolean;
    }
</script>
