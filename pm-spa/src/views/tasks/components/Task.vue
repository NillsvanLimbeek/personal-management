<template>
    <div class="task">
        <TaskDropdown
            :task-sections="taskSections"
            @move-to-section="moveTask($event)"
            @duplicate-task="duplicateTask"
            @delete-task="deleteTask"
        />

        <div @click="openModal(task.id)" class="task__body">
            <div
                :class="{ 'task__checkbox--active': task.completed }"
                class="task__checkbox"
                @click.stop="updateTask"
            />

            <div @click.stop="editTitle" class="task__title">
                <InlineEdit :title="task.title" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Getter, mixins } from '@/vue-script';

    import { ITask, ITaskSection } from '@/data/models';
    import { generateGuid } from '@/utils';

    const TaskDropdown = () => import('@components/tasks/TaskDropdown.vue');
    const InlineEdit = () => import('@components/InlineEdit.vue');

    @Component({
        components: {
            TaskDropdown,
            InlineEdit,
        },
    })
    export default class Task extends Vue {
        @Getter('taskSections/getTaskSections')
        private taskSections!: ITaskSection[];

        @Prop({ required: true }) private task!: ITask;

        private checkbox: boolean = false;

        private updateTask(): void {
            this.$store.dispatch('tasks/updateTask', {
                id: this.task.id,
                completed: !this.task.completed,
            });
        }

        private moveTask(taskSectionId: string): void {
            // update task
            const task: ITask = { ...this.task, taskSectionId };
            this.$store.dispatch('tasks/updateTask', task);

            // update old section
            const oldSection = this.taskSections.find(
                (x) => x.id === this.task.taskSectionId,
            );

            if (oldSection && oldSection.taskIds) {
                oldSection.taskIds = oldSection.taskIds.filter(
                    (x) => x !== task.id,
                );
                this.$store.dispatch('taskSections/updateSection', oldSection);
            }

            // update new section
            const newSection = this.taskSections.find(
                (x) => x.id === taskSectionId,
            );

            if (newSection && newSection.taskIds) {
                newSection.taskIds.push(task.id);
                this.$store.dispatch('taskSections/updateSection', newSection);
            }
        }

        private duplicateTask() {
            const newTask: ITask = {
                ...this.task,
                id: generateGuid(),
                title: `Copy of ${this.task.title}`,
            };
            this.$store.dispatch('tasks/addTask', newTask);

            this.$store.dispatch('taskSections/addTaskToSection', {
                taskSectionId: newTask.taskSectionId,
                taskId: newTask.id,
            });
        }

        private deleteTask() {
            this.$store.dispatch('tasks/deleteTask', this.task.id);

            const taskSection = this.taskSections.find(
                (x) => x.id === this.task.taskSectionId,
            );

            if (taskSection && taskSection.taskIds) {
                const newTaskIds = taskSection.taskIds.filter(
                    (x) => x !== this.task.id,
                );
                const newTaskSection = { ...taskSection, taskIds: newTaskIds };

                this.$store.dispatch('taskSections/updateSection', newTaskSection);
            }
        }

        private openModal(id: string) {
            if (this.$route.name === 'taskModal') {
                this.$router.replace({ path: `${id}` });
            } else {
                this.$router.push({ path: `list/task/${id}` });
            }
        }

        private editTitle() {
            //
        }
    }
</script>
