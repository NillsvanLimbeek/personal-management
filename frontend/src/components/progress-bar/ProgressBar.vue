<template>
	<div class="progress-bar">
		<label
			class="progress-bar__label"
			for="section"
		>
			{{ title }}
		</label>

		<progress
			id="section"
			max="100"
			:value="value"
		>
			{{ value }}
		</progress>

		<p class="progress-bar__tasks">{{ completedTasks }} / {{ totalTasks }}</p>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from '@/vue-script';

	@Component({})
	export default class ProgressBar extends Vue {
		@Prop({ required: true }) private title!: string;
		@Prop({ required: true }) private value!: string;
		@Prop({ required: true }) private completedTasks!: string;
		@Prop({ required: true }) private totalTasks!: string;
	}
</script>

<style lang="scss" src="./ProgressBar.scss">
</style>
