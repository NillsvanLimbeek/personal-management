<template>
    <div
        class="progress-ring"
        :style="{ width: `${size}px` }"
    >
        <svg
            class="progress-ring"
            :width="size"
            :height="size"
        >
            <circle
                class="progress-ring__circle--bottom"
                fill="transparent"
                :stroke-width="strokeWidth"
                :r="circleRadius"
                :cx="circleSize"
                :cy="circleSize"
            />

            <circle
                ref="circle"
                class="progress-ring__circle"
                :stroke="stroke"
                fill="transparent"
                :stroke-width="strokeWidth"
                :r="circleRadius"
                :cx="circleSize"
                :cy="circleSize"
            />

        </svg>

        <p class="progress-ring__center-text">
            {{ taskData.completedTasks }} / {{ taskData.totalTasks }}
        </p>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from '@/vue-script';

    import { IProgressRingData } from '@data/models';

    @Component({})
    export default class ProgressRing extends Vue {
        @Prop({ default: 120 }) private size!: number;
        @Prop({ default: 4 }) private strokeWidth!: number;
        @Prop({ default: 'white' }) private stroke!: string;
        @Prop() private taskData!: IProgressRingData;

        @Watch('percent')
        private watchProgress() {
            this.setProgress(this.taskData.percent);
        }

        private setProgress(percent: number) {
            const circle = this.$refs.circle as SVGCircleElement;
            const radius = circle?.r.baseVal.value;

            if (circle && radius) {
                const circumference = radius * 2 * Math.PI;
                const offset = `${circumference - (percent / 100) * circumference}`;

                circle.style.strokeDasharray = `${circumference} ${circumference}`;
                circle.style.strokeDashoffset = offset;
            }
        }

        private get circleSize(): number {
            return this.size / 2;
        }

        private get circleRadius(): number {
            return this.size / 2 - this.strokeWidth * 2;
        }

        private mounted() {
            this.taskData.percent
                ? this.setProgress(this.taskData.percent)
                : this.setProgress(0);
        }
    }
</script>

<style lang="scss" src="./ProgressRing.scss"></style>
