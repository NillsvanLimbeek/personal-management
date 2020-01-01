<template>
	<div class="task-sections-widget">
		<h4 class="task-sections-widget__title">Task Sections</h4>

		<div class="task-sections-widget__body">
			<ProgressBar
				v-for="(section, index) in sectionsData"
				:key="index"
				v-bind:section-data="section"
			/>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from '@/vue-script';

	import { ITaskSection, ITask, ISectionWidgetData } from '@/data/models';

	const ProgressBar = () => import('@components/progress-bar/ProgressBar.vue');

	@Component({
		components: {
			ProgressBar,
		},
	})
	export default class TaskSectionsWidget extends Vue {
		@Prop({ required: true }) private taskSections!: ITaskSection[];
		@Prop({ required: true }) private tasks!: ITask[];

		private get sectionsData() {
			const sectionsData: ISectionWidgetData[] = [];

			this.taskSections.forEach((taskSection) => {
				sectionsData.push({
					title: taskSection.title,
					totalTasks: taskSection.taskIds.length,
					completedTasks: this.tasks
						.filter((task) => task.taskSectionId === taskSection.id)
						.filter((task) => task.completed === true).length,
				});
			});

			return sectionsData;
		}
	}
</script>

<style lang="scss" src="./TaskSectionsWidget.scss">
</style>
