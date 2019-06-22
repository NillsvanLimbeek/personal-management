<template>
    <div class="datepicker">
        <button @click="previousMonth">
            previous month
        </button>

        {{ months[1][0] }}

        <button @click="nextMonth">
            next month
        </button>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    import {
        startOfMonth,
        getDaysInMonth,
        addDays,
        format,
        subMonths,
        addMonths,
    } from 'date-fns';

    @Component({})
    export default class Datepicker extends Vue {
        @Prop() private date!: Date;

        private months: any[] = [];
        private startDates: Date[] = [];

        private getDates(date?: Date) {
            let currentMonth: Date;

            if (date) {
                currentMonth = date;
            } else {
                currentMonth = startOfMonth(Date.now());
            }

            const previousMonth: Date = subMonths(currentMonth, 1);
            const nextMonth: Date = addMonths(currentMonth, 1);

            this.startDates = [previousMonth, currentMonth, nextMonth];
        }

        private getDays(date: Date) {
            let month: Date[];

            month = [...Array(getDaysInMonth(date))].map((y, x) => {
                return addDays(date, x);
            });

            return month;
        }

        private previousMonth() {
            const previousMonth = subMonths(this.months[0][0], 1);

            this.months.pop();
            this.months.unshift(this.getDays(previousMonth));
        }

        private nextMonth() {
            const nextMonth = addMonths(this.months[2][0], 1);

            this.months.shift();
            this.months.push(this.getDays(nextMonth));
        }

        private created() {
            this.date ? this.getDates(this.date) : this.getDates();

            this.startDates.forEach((date: Date) => {
                this.months.push(this.getDays(date));
            });
        }
    }
</script>
