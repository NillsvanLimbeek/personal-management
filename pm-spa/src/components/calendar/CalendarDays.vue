<template>
    <div class="calendar-days">
        <p v-for="day in daysInMonth">{{ day | date('d') }}</p>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    import { getDaysInMonth, addDays, startOfMonth } from 'date-fns';

    @Component({})
    export default class Calendar extends Vue {
        private date: Date = new Date();

        private get daysInMonth(): Date[] {
            const start: Date = startOfMonth(this.date);

            return [...Array(getDaysInMonth(start))].map((y, x) => {
                return addDays(start, x);
            });
        }
    }
</script>
