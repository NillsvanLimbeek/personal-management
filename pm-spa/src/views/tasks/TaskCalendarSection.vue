<template>
    <div class="calendar">
        <h2>Calendar</h2>

        <Datepicker />
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';
    import { startOfMonth, addYears } from 'date-fns';

    const Datepicker = () => import('@components/datepicker/Datepicker.vue');

    @Component({
        components: {
            Datepicker,
        },
    })
    export default class TaskCalendarSection extends Vue {
        private today: Date = startOfMonth(Date.now());
        private nextYear: Date = addYears(this.today, 1);
    }
</script>
