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
                :key="index"
                @click="$emit('create-task', day)"
                @mouseenter="showAdd = index"
                @mouseleave="showAdd = null"
            >

                <div class="calendar__day-header">
                    {{ day | date('d') }}
                </div>

                <CalendarTask
                    v-for="(task, index) in filteredTasks(day)"
                    :key="index"
                    :task="task"
                />

                <span
                    v-if="showAdd === index && filteredTasks(day).length == 0"
                    :key="index"
                    class="calendar__add"
                >
                    <i class="fas fa-plus"></i> Add
                </span>
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

    const CalendarTask = () => import('./calendar-task/CalendarTask.vue');

    @Component({
        components: {
            CalendarTask,
        },
    })
    export default class Calendar extends Vue {
        @Prop({ required: true }) private tasks!: ITask[];

        private date: Date = startOfMonth(new Date());
        private showAdd: boolean = false;

        private get daysInMonth(): Date[] {
            const start: Date = startOfMonth(this.date);

            return [...Array(getDaysInMonth(start))].map((_, index) => {
                return addDays(start, index);
            });
        }

        private get getWeekDays(): Date[] {
            const today = Date.now();

            return eachDayOfInterval({
                start: startOfWeek(today),
                end: endOfWeek(today),
            });
        }

        private filteredTasks(date: Date) {
            return this.tasks.filter((task) => {
                if (task.dueDate) {
                    return isSameDay(task.dueDate, date);
                }
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
                    this.date = startOfMonth(new Date());
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

<style lang="scss" src="./Calendar.scss">
</style>
