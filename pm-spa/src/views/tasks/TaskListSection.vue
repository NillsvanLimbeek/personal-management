<template>
    <div class="tasks">
        <div class="tasks__header">
            <button class="tasks__button button" @click="addSection">
                Add Section
            </button>
        </div>

        <div class="tasks__section">
            <TaskSection
                v-for="taskSection in taskSections"
                :key="taskSections.id"
                :task-section="taskSection"
                :tasks="tasks"
                @add-task="$store.dispatch('tasks/addTask', $event)"
                @update-task="$store.dispatch('tasks/updateTask', $event)"
                @update-section="
                    $store.dispatch('taskSections/updateSection', $event)
                "
                @delete-section="deleteSection($event)"
                @duplicate-section="duplicateSection($event)"
            />
        </div>
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

    const TaskSection = () => import('@components/tasks/TaskSection.vue');

    @Component({
        components: {
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

        private deleteSection(ids: ITaskSectionDeleteIds) {
            const deleteSection = this.$store.dispatch(
                'taskSections/deleteSection',
                ids.taskSectionId,
            );
            const deleteTasks = this.$store.dispatch(
                'tasks/deleteTasks',
                ids.taskIds,
            );

            Promise.all([deleteSection, deleteTasks]);
        }

        private duplicateSection(ids: ITaskSectionAddIds) {
            this.$store
                .dispatch('taskSections/duplicateSection', ids.taskSectionId)
                .then((section: ITaskSection) => {
                    if (section.taskIds) {
                        section.taskIds.forEach((id) => {
                            this.$store.dispatch('tasks/duplicateTask', {
                                taskId: id,
                                taskSectionId: section.id,
                            });
                        });
                    }
                });
        }
    }
</script>
