<template>
    <div class="month">
        <div class="month__header">
            {{ date | date('MMMM yyyy') }}
        </div>

        <div class="month__body">
            <div class="month__days">
                <div
                    v-for="(day, index) in getDays"
                    class="month__day"
                    :class="{
                        'month__day--today': isToday(day),
                        'month__day--selected': isSelected(day),
                    }"
                    :style="{ gridColumn: startOfMonth(index) }"
                    @click="$emit('select-date', day)"
                >

                    {{ day | date('d') }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    import {
        getDaysInMonth,
        addDays,
        format,
        startOfMonth,
        getDay,
        startOfWeek,
        endOfWeek,
        isToday,
        isSameDay,
    } from 'date-fns';

    @Component({})
    export default class Month extends Vue {
        @Prop({ required: true }) private date!: Date;
        @Prop() private selectedDate!: Date;

        private get getDays() {
            let month: Date[];

            month = [...Array(getDaysInMonth(this.date))].map((_, index) => {
                return addDays(this.date, index);
            });

            return month;
        }

        private startOfMonth(index: number) {
            if (index === 0) {
                return getDay(this.date) + 1;
            }
        }

        private isToday(day: Date) {
            return isToday(day);
        }

        private isSelected(day: Date) {
            return isSameDay(day, this.selectedDate);
        }
    }
</script>

<style lang="scss">
    @import 'Month.scss';
</style>
