<template>
	<div class="tasks-widget">
		<h4 class="tasks-widget__title">
			{{ widgetData.title }}
		</h4>

		<div class="tasks-widget__body">
			<ProgressRing
				class="tasks-widget__ring"
				:stroke="widgetData.stroke"
				v-bind:taskData="widgetData.progressRing"
			/>

			<ul class="tasks-widget__list">
				<TaskMini
					v-for="task in widgetData.tasks"
					:key="task.id"
					:task="task"
				/>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from '@/vue-script';

	import { ITasksWidgetData } from '@/data/models';

	const ProgressRing = () =>
		import('@/components/progress-ring/ProgressRing.vue');
	const TaskMini = () => import('@/components/task-mini/TaskMini.vue');

	@Component({
		components: {
			ProgressRing,
			TaskMini,
		},
	})
	export default class TasksWidget extends Vue {
		@Prop({ required: true }) private widgetData!: ITasksWidgetData;
	}
</script>

<style lang="scss" src="./TasksWidget.scss">
</style>
