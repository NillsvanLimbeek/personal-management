<template>
    <div class="calendar">
        <h2>Calendar</h2>

        <CalendarHeader />
        <CalendarDays />
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    const CalendarHeader = () => import('@components/calendar/CalendarHeader.vue');
    const CalendarDays = () => import('@components/calendar/CalendarDays.vue');

    @Component({
        components: {
            CalendarHeader,
            CalendarDays,
        },
    })
    export default class TaskCalendarSection extends Vue {}
</script>
