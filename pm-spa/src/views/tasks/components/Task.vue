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
            const task: ITask = { ...this.task };
            task.taskSectionId = taskSectionId;

            this.$store.dispatch('tasks/moveTask', task);
        }
    }
</script>
