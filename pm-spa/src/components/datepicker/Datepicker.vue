<template>
    <div
        v-click-outside="closeDatepicker"
        class="datepicker"
    >

        <div
            @click="showDatepicker = true"
            class="datepicker__trigger"
        >

            <i class="far fa-calendar-alt"></i>
            {{ triggerTitle }}
        </div>

        <div
            v-if="showDatepicker"
            class="datepicker__container"
        >

            <i
                class="datepicker__arrow fas fa-arrow-left"
                @click="previousMonth"
            />

            <div class="datepicker__body">
                <div class="datepicker__weekdays">
                    <span v-for="weekday in getWeekDays">
                        {{ weekday }}
                    </span>
                </div>

                <div
                    class="datepicker__months"
                    :style="{ transform: `translateX(${30 * step}rem)` }"
                >
                    <Month
                        v-for="(startDate, index) in startDates"
                        :key="index"
                        :date="startDate"
                        :selected-date="date"
                        class="datepicker__month"
                    />
                </div>

                <Month
                    v-if="visible"
                    class="datepicker__month datepicker__month--absolute"
                    :date="startDates[1]"
                    :selected-date="date"
                />
            </div>

            <i
                class="datepicker__arrow fas fa-arrow-right"
                @click="nextMonth"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    const Month = () => import('./Month.vue');

    import {
        startOfMonth,
        getDaysInMonth,
        addDays,
        format,
        subMonths,
        addMonths,
        eachDay,
        startOfWeek,
        endOfWeek,
    } from 'date-fns';

    @Component({
        components: {
            Month,
        },
    })
    export default class Datepicker extends Vue {
        @Prop() private date!: Date;

        private showDatepicker: boolean = false;
        private startDates: Date[] = [];
        private step: number = -1;
        private visible: boolean = false;
        private disabled: boolean = false;

        private get getWeekDays() {
            const today = Date.now();
            const week = eachDay(startOfWeek(today), endOfWeek(today));

            return week.map((x) => format(x, 'dd'));
        }

        private get triggerTitle() {
            return this.date ? format(this.date, 'MM DDDD') : 'Due Date';
        }

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

        private previousMonth() {
            if (!this.disabled) {
                this.step++;
                this.disabled = true;

                setTimeout(() => {
                    const previousMonth = subMonths(this.startDates[0], 1);

                    this.startDates.pop();
                    this.startDates.unshift(previousMonth);

                    this.visible = true;
                    this.step = -1;
                }, 300);

                setTimeout(() => {
                    this.disabled = false;
                    this.visible = false;
                }, 500);
            }
        }

        private nextMonth() {
            if (!this.disabled) {
                this.step--;
                this.disabled = true;

                setTimeout(() => {
                    const nextMonth = addMonths(this.startDates[2], 1);

                    this.startDates.shift();
                    this.startDates.push(nextMonth);

                    this.visible = true;
                    this.step = -1;
                }, 300);

                setTimeout(() => {
                    this.disabled = false;
                    this.visible = false;
                }, 500);
            }
        }

        private closeDatepicker() {
            this.showDatepicker = false;
        }

        private created() {
            this.date ? this.getDates(this.date) : this.getDates();
        }
    }
</script>
