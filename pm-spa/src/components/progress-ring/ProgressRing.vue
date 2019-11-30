<template>
    <div class="progress-ring">
        <svg
            class="progress-ring"
            :width="size"
            :height="size"
        >
            <circle
                class="progress-ring__circle"
                stroke="white"
                fill="transparent"
                :stroke-width="strokeWidth"
                :r="circleRadius"
                :cx="circleSize"
                :cy="circleSize"
            />
        </svg>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from '@/vue-script';

    @Component({})
    export default class ProgressRing extends Vue {
        @Prop({ default: 120 }) private size!: number;
        @Prop({ default: 4 }) private strokeWidth!: number;
        @Prop({ default: 50 }) private percent!: number;

        private get circleSize(): number {
            return this.size / 2;
        }

        private get circleRadius(): number {
            return this.size / 2 - this.strokeWidth * 2;
        }

        private progress() {
            const circle = document.querySelector('circle');
            const radius = circle?.r.baseVal.value;

            if (circle && radius) {
                const circumference = radius * 2 * Math.PI;

                circle.style.strokeDasharray = `${circumference} ${circumference}`;
                circle.style.strokeDashoffset = `${circumference}`;

                this.setProgress(this.percent);
            }
        }

        private setProgress(percent: number) {
            const circle = document.querySelector('circle');
            const radius = circle?.r.baseVal.value;

            if (circle && radius) {
                const circumference = radius * 2 * Math.PI;

                const offset = `${circumference - (percent / 100) * circumference}`;
                circle.style.strokeDashoffset = offset;
            }

            console.log(circle);
        }

        private created() {
            this.progress();
        }
    }
</script>

<style lang="scss" src="./ProgressRing.scss">
</style>
