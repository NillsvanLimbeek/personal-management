<template>
	<div class="task-sections-widget">
		<h4 class="task-sections-widget__title">Task Sections</h4>

		<div class="task-sections-widget__body">
			<ProgressBar
				title="Section"
				value="50"
				completed-tasks="1"
				total-tasks="2"
			/>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component } from '@/vue-script';

	const ProgressBar = () => import('@components/progress-bar/ProgressBar.vue');

	@Component({
		components: {
			ProgressBar,
		},
	})
	export default class TaskSectionsWidget extends Vue {}
</script>

<style lang="scss" src="./TaskSectionsWidget.scss">
</style>
