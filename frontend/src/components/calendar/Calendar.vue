<template>
    <div class="calendar">
        <div class="calendar__header">
            <div class="calendar__view">
                <BaseButton @click="view = 'week'">
                    Week
                </BaseButton>

                <BaseButton @click="view = 'month'">
                    Month
                </BaseButton>
            </div>

            <i
                class="calendar__arrow fas fa-chevron-left"
                @click="switchDate('previous-month')"
            />

            <span>{{ date | date('MMMM yyyy') }}</span>

            <i
                class="calendar__arrow fas fa-chevron-right"
                @click="switchDate('next-month')"
            />

            <BaseButton
                class="calendar__button calendar__button--right"
                @click="switchDate('today')"
            >
                Today
            </BaseButton>
        </div>

        <Month
            v-if="view === 'month'"
            :date="date"
            :tasks="tasks"
        />
        <Week
            v-if="view === 'week'"
            :date="date"
            :tasks="tasks"
        />
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

    const BaseButton = () => import('@/components/base-button/BaseButton.vue');
    const Month = () => import('./month/Month.vue');
    const Week = () => import('./week/Week.vue');

    @Component({
        components: {
            BaseButton,
            Month,
            Week,
        },
    })
    export default class Calendar extends Vue {
        @Prop() private tasks!: ITask[];

        private date: Date = startOfMonth(new Date());
        private showAdd: boolean = false;
        private view: 'week' | 'month' = 'month';

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
