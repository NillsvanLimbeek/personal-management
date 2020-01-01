<template>
	<div class="progress-bar">
		<label
			class="progress-bar__label"
			for="section"
		>
			{{ sectionData.title }}
		</label>

		<progress
			id="section"
			:max="sectionData.totalTasks"
			:value="sectionData.completedTasks"
		>
			{{ sectionData.completedTasks }}
		</progress>

		<p class="progress-bar__tasks">{{ sectionData.completedTasks }} / {{ sectionData.totalTasks }}</p>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from '@/vue-script';
	import { ITasksWidgetData } from '@/data/models';

	@Component({})
	export default class ProgressBar extends Vue {
		@Prop({ required: true }) private sectionData!: ITasksWidgetData;
	}
</script>

<style lang="scss" src="./ProgressBar.scss">
</style>
