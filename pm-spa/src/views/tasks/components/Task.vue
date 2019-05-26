<template>
    <div class="task">
        <TaskDropdown
            :task-sections="taskSections"
            @move-to-section="moveTask($event)" />

        <div
            :class="{ 'task__checkbox--active': task.completed }"
            class="task__checkbox"
            @click="updateTask(task.completed)"
        />

        {{ task.title }}
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Getter } from '@/vue-script';

    import { ITask, ITaskSection } from '@/data/models';

    const TaskDropdown = () => import('@components/tasks/TaskDropdown.vue');

    @Component({
        components: {
            TaskDropdown,
        },
    })
    export default class Task extends Vue {
        @Getter('taskSections/getTaskSections')
        private taskSections!: ITaskSection[];

        @Prop({ required: true }) private task!: ITask;

        private checkbox: boolean = false;

        private updateTask(msg: boolean): void {
            this.task.completed = msg === true ? false : true;

            this.$emit('update-task', {
                id: this.task.id,
                completed: this.task.completed,
            });
        }

        private moveTask(taskSectionId: string) {
            const oldSectionId = this.task.taskSectionId;
            const newSectionId = taskSectionId;
            const task: ITask = { ...this.task, taskSectionId };

            const updateTask = this.$store.dispatch('tasks/updateTask', task);
            let updateOldSection;
            let updateNewSection;

            // update old section
            const oldSection = this.taskSections.find((x) => x.id === oldSectionId);

            if (oldSection && oldSection.taskIds) {
                oldSection.taskIds = oldSection.taskIds.filter(
                    (x) => x !== task.id,
                );
                updateOldSection = this.$store.dispatch(
                    'taskSections/updateSection',
                    oldSection,
                );
            }

            // update new section
            const newSection = this.taskSections.find((x) => x.id === newSectionId);

            if (newSection && newSection.taskIds) {
                newSection.taskIds.push(task.id);
                updateNewSection = this.$store.dispatch(
                    'taskSections/updateSection',
                    newSection,
                );
            }

            Promise.all([updateTask, updateOldSection, updateNewSection]);
        }
    }
</script>
