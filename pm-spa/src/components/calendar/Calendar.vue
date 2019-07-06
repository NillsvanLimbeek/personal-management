<template>
    <div class="calendar">
        <div class="calendar__header">
            <i
                class="calendar__arrow fas fa-chevron-left"
                @click="switchDate('previous-month')"
            />

            <span>{{ date | date('MMMM yyyy') }}</span>

            <i
                class="calendar__arrow fas fa-chevron-right"
                @click="switchDate('next-month')"
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

                <div class="calendar__day-header">
                    {{ day | date('d') }}
                </div>

                <div
                    class="calendar__task-list"
                    v-if="tasks.length > 0"
                >
                    <div
                        class="calendar__tasks"
                        v-for="task in tasks"
                    >

                        <CalendarTask
                            v-if="sameDay(day, task)"
                            :task="task"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Getter } from '@/vue-script';

    import { ITask } from '@data/models';

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
        isSameMonth,
        isSameDay,
    } from 'date-fns';

    const CalendarTask = () => import('./CalendarTask.vue');

    @Component({
        components: {
            CalendarTask,
        },
    })
    export default class Calendar extends Vue {
        @Prop({ required: true }) private tasks!: ITask[];

        private date: Date = setDate(new Date(), 1);

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

        private sameDay(day: Date, task: ITask) {
            return isSameDay(day, task.dueDate as Date);
        }

        private startOfMonth(index: number) {
            if (index === 0) {
                return getDay(this.date) + 1;
            }
        }

        private isToday(date: Date) {
            return isToday(date);
        }

        private switchDate(date: string) {
            switch (date) {
                case (date = 'today'):
                    this.date = setDate(new Date(), 1);
                    break;
                case (date = 'next-month'):
                    this.date = addMonths(this.date, 1);
                    break;
                case (date = 'previous-month'):
                    this.date = subMonths(this.date, 1);
                    break;
            }
        }
    }
</script>
