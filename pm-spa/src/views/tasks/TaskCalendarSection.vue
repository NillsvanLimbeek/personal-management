<template>
    <!-- <div> -->
    <Calendar />
    <!-- </div> -->
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    const Calendar = () => import('@components/calendar/Calendar.vue');

    @Component({
        components: {
            Calendar,
        },
    })
    export default class TaskCalendarSection extends Vue {}
</script>
