<template>
    <div class="calendar">
        <div class="calendar__header">
            <i
                class="calendar__arrow fas fa-chevron-left"
                @click="subtractMonth"
            />

            <span>{{ date | date('MMMM yyyy') }}</span>

            <i
                class="calendar__arrow fas fa-chevron-right"
                @click="addMonth"
            />

            <button
                class="button calendar__button"
                @click="switchDate('today')"
            >
                Today
            </button>
        </div>

        <div class="calendar__weekdays">
            <span v-for="day in getWeekDays">
                {{ day | date('EEE') }}
            </span>
        </div>

        <div class="calendar__days">
            <div
                v-for="(day, index) in daysInMonth"
                class="calendar__day"
                :class="{ 'calendar__day--today': isToday(day) }"
                :style="{ gridColumn: startOfMonth(index) }"
            >

                {{ day | date('d') }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    import {
        getDaysInMonth,
        addDays,
        startOfMonth,
        getDay,
        eachDayOfInterval,
        startOfWeek,
        endOfWeek,
        format,
        isToday,
        addMonths,
        subMonths,
        setDate,
    } from 'date-fns';

    @Component({})
    export default class Calendar extends Vue {
        private date: Date = new Date();

        private get daysInMonth(): Date[] {
            const start: Date = startOfMonth(this.date);

            return [...Array(getDaysInMonth(start))].map((y, x) => {
                return addDays(start, x);
            });
        }

        private get getWeekDays(): Date[] {
            const today = Date.now();

            return eachDayOfInterval({
                start: startOfWeek(today),
                end: endOfWeek(today),
            });
        }

        private startOfMonth(index: number) {
            if (index === 0) {
                return getDay(this.date) + 1;
            }
        }

        private isToday(date: Date) {
            return isToday(date);
        }

        private addMonth() {
            this.date = addMonths(this.date, 1);
        }

        private subtractMonth() {
            this.date = subMonths(this.date, 1);
        }

        private switchDate(date: string) {
            switch (date) {
                case (date = 'today'):
                    this.date = setDate(new Date(), 1);
                    break;

                default:
                    break;
            }
        }
    }
</script>
