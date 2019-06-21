<template>
    <div class="calendar">
        <h2>Calendar</h2>

        <Datepicker />
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    import {
        startOfMonth,
        getDaysInMonth,
        addDays,
        format,
        subMonths,
        addMonths,
    } from 'date-fns';

    const Datepicker = () => import('@components/datepicker/Datepicker.vue');

    @Component({
        components: {
            Datepicker,
        },
    })
    export default class TaskCalendarSection extends Vue {
        private months: any[] = [];
        private startDates: Date[] = [];

        private getDays() {
            let month: Date[];
            const today: Date = startOfMonth(Date.now());

            month = [...Array(getDaysInMonth(today))].map((y, x) => {
                return addDays(today, x);
            });

            return month;
        }

        private getStartDates() {
            const today: Date = startOfMonth(Date.now());
            const previousMonth: Date = subMonths(today, 1);
            const nextMonth: Date = addMonths(today, 1);
        }

        private created() {
            this.months.push(this.getDays());
        }
    }
</script>
