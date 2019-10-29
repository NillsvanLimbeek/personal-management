<template>
    <div class="tasks">
        <div class="tasks__header">
            <BaseButton
                class="tasks__button"
                @click="addSection"
            >
                Add Section
            </BaseButton>

            <SearchBar />
        </div>

        <div class="tasks__section">
            <TaskSection
                v-for="taskSection in taskSections"
                :key="taskSections.id"
                :task-section="taskSection"
                :tasks="tasks"
            />
        </div>

        <transition name="modal-right">
            <router-view />
        </transition>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Getter } from '@/vue-script';

    import { ITaskState } from '@state/index';
    import {
        ITask,
        ITaskSection,
        ITaskSectionDeleteIds,
        ITaskSectionAddIds,
    } from '@models/index';

    import { generateGuid } from '@/utils';

    const BaseButton = () => import('@/components/base-button/BaseButton.vue');
    const SearchBar = () => import('@/components/search-bar/SearchBar.vue');
    const TaskSection = () => import('./components/TaskSection.vue');

    @Component({
        components: {
            BaseButton,
            SearchBar,
            TaskSection,
        },
    })
    export default class TaskListSection extends Vue {
        @Getter('taskSections/getTaskSections')
        private taskSections!: ITaskSection[];
        @Getter('tasks/getTasks') private tasks!: ITask[];

        private addSection(): void {
            const taskSection: ITaskSection = {
                id: generateGuid(),
                title: 'New group',
                taskIds: [],
                isOpen: true,
            };

            this.$store.dispatch('taskSections/addSection', taskSection);
        }
    }
</script>

<style lang="scss" src="./TaskListSection.scss">
</style>
