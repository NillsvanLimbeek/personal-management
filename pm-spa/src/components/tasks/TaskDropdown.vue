<template>
    <div class="task-dropdown">
        <Dropdown class="task-dropdown__dropdown">
            <DropdownSection>
                <DropdownItem
                    title="Rename task"
                    @click="$emit('rename-task')"
                />
            </DropdownSection>

            <DropdownSection>
                <DropdownItem
                    title="Move to section"
                    second-menu="true"
                >
                    <DropdownSection :last-section="true">
                        <DropdownItem
                            v-for="taskSection in taskSections"
                            :key="taskSection.id"
                            :title="taskSection.title"
                            @click="$emit('move-to-section', taskSection.id)" />
                    </DropdownSection>

                </DropdownItem>
            </DropdownSection>

            <DropdownSection>
                <DropdownItem
                    title="Duplicate task"
                    @click="$emit('duplicate-task')"
                    disabled="true"
                />
            </DropdownSection>

            <DropdownSection :last-section="true">
                <DropdownItem
                    title="Delete task"
                    @click="$emit('delete-task')"
                    disabled="true"
                />
            </DropdownSection>
        </Dropdown>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    import { ITaskSection } from '@/data/models';

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
    export default class TaskDropdown extends Vue {
        @Prop() private taskSections!: ITaskSection[];
    }
</script>
