<template>
    <div class="datepicker">
        <i
            class="datepicker__arrow fas fa-arrow-left"
            @click="previousMonth"
        />

        <div class="datepicker__wrapper">
            <div
                class="datepicker__month-list"
                :style="{ transform: `translateX(${35 * step}rem)` }"
            >
                <Month
                    v-for="(startDate, index) in startDates"
                    :key="index"
                    :date="startDate"
                    class="datepicker__month"
                />
            </div>

            <Month
                v-if="visible"
                class="datepicker__month datepicker__month--absolute"
                :date="startDates[1]"
            />
        </div>

        <i
            class="datepicker__arrow fas fa-arrow-right"
            @click="nextMonth"
        />
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
    } from 'date-fns';

    @Component({
        components: {
            Month,
        },
    })
    export default class Datepicker extends Vue {
        @Prop() private date!: Date;

        private startDates: Date[] = [];
        private step: number = -1;
        private visible: boolean = false;
        private disabled: boolean = false;

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

        private created() {
            this.date ? this.getDates(this.date) : this.getDates();
        }
    }
</script>
