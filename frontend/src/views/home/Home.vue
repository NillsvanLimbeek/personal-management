<template>
	<div class="home">
		<div class="home__tasks">
			<TasksWidget v-bind:widget-data="completedTasks" />
			<TasksWidget v-bind:widget-data="overdueTasks" />
		</div>

		<TaskSectionsWidget
			:task-sections="taskSections"
			:tasks="tasks"
		/>

		<transition name="modal-center">
			<router-view />
		</transition>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Getter } from '@/vue-script';

	import {
		ITask,
		IProgressRingData,
		ITasksWidgetData,
		ITaskSection,
	} from '@/data/models';
	import { EventBus } from '@/event-bus';
	import { isBefore } from 'date-fns';
	import { taskWidgetData } from '@utils/index';

	const TasksWidget = () => import('@/components/tasks-widget/TasksWidget.vue');
	const TaskSectionsWidget = () =>
		import('@/components/task-sections-widget/TaskSectionsWidget.vue');

	@Component({
		components: {
			TasksWidget,
			TaskSectionsWidget,
		},
	})
	export default class Home extends Vue {
		@Getter('taskSections/getTaskSections')
		private taskSections!: ITaskSection[];
		@Getter('tasks/getTasks') private tasks!: ITask[];

		private get completedTasks(): ITasksWidgetData {
			return taskWidgetData('Completed Tasks', '#4680ff', this.tasks);
		}

		private get overdueTasks(): ITasksWidgetData {
			return taskWidgetData(
				'Overdue Tasks',
				'#fb617f',
				this.tasks.filter((task) => task.dueDate),
			);
		}

		private created() {
			EventBus.$on('update-task', (task: ITask) => {
				this.$store.dispatch('tasks/updateTask', task);
			});

			EventBus.$on('open-task', (id: string) => {
				this.$router.push({ name: 'homeTaskModal', params: { id } });
			});
		}
	}
</script>

<style lang="scss" src="./Home.scss">
</style>