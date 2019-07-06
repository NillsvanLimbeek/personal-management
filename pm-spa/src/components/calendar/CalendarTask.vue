<template>
    <div
        class="calendar-task"
        @click.stop="openModal"
    >
        {{ task.title }}
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    import { ITask } from '@/data/models';

    import { EventBus } from '@/event-bus';

    @Component({})
    export default class CalendarTask extends Vue {
        @Prop({ required: true }) private task!: ITask;

        private openModal() {
            EventBus.$emit('task-modal', this.task.id);
        }
    }
</script>
