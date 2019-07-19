<template>
    <div
        class="calendar-task"
        @click.stop="openModal"
    >
        <span>{{ task.title }}</span>

        <div
            :class="{ 'task__checkbox--active': task.completed }"
            class="task__checkbox"
            @click.stop="updateTask(task.completed)"
        />
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    import { ITask } from '@/data/models';

    import { EventBus } from '@/event-bus';

    @Component({})
    export default class CalendarTask extends Vue {
        @Prop({ required: true }) private task!: ITask;

        private openModal(): void {
            EventBus.$emit('task-modal', this.task.id);
        }

        private updateTask(complete: boolean): void {
            this.task.completed = !complete;
            EventBus.$emit('update-task', this.task.completed);
        }
    }
</script>

<style lang="scss">
    @import 'CalendarTask.scss';
</style>
