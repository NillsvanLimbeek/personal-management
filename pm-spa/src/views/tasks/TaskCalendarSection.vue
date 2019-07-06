<template>
    <Calendar :tasks="tasks" />
</template>

<script lang="ts">
    import { Vue, Component, Getter } from '@/vue-script';

    import { ITask } from '@/data/models';

    const Calendar = () => import('@components/calendar/Calendar.vue');

    @Component({
        components: {
            Calendar,
        },
    })
    export default class TaskCalendarSection extends Vue {
        @Getter('tasks/getTasks') private tasks!: ITask[];
    }
</script>
