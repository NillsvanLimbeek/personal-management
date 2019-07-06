<template>
    <div class="calendar-task">
        {{ task.title }}
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    import { ITask } from '@/data/models';

    @Component({})
    export default class CalendarTask extends Vue {
        @Prop({ required: true }) private task!: ITask;
    }
</script>
