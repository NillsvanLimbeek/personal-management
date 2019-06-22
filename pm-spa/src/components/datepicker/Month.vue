<template>
    <div class="month">
        <div class="month__header">
            {{ formatDate }}
        </div>

        <div class="month__body">

        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    import { getDaysInMonth, addDays, format } from 'date-fns';

    @Component({})
    export default class Month extends Vue {
        @Prop({ required: true }) private date!: Date;

        private get formatDate() {
            return format(this.date, 'MMMM YYYY');
        }

        private getDays(date: Date) {
            let month: Date[];

            month = [...Array(getDaysInMonth(date))].map((y, x) => {
                return addDays(date, x);
            });

            return month;
        }
    }
</script>
