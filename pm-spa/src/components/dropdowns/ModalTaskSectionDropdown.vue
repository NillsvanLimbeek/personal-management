<template>
    <div class="modal-task-section">
        <Dropdown :selected-item="selectedItem">
            <DropdownSection>
                <DropdownItem
                    v-for="taskSection in taskSections"
                    :key="taskSection.id"
                    :title="taskSection.title"
                    @click="$emit('select-section', taskSection)"
                />
            </DropdownSection>
        </Dropdown>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    import { ITaskSection } from '@data/models';

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
    export default class ModalTaskSection extends Vue {
        @Prop() private taskSections!: ITaskSection[];
        @Prop() private selectedItem!: string;
    }
</script>
