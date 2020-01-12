<template>
	<div>
		<Calendar
			:tasks="tasks"
			@create-task="openCreateModal($event)"
			@calendar-task-modal="openTaskModal($event)"
		/>

		<transition name="modal-center">
			<router-view />
		</transition>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Getter } from '@/vue-script';

	import { ITask } from '@/data/models';
	import { EventBus } from '@/event-bus';

	const Calendar = () => import('@components/calendar/Calendar.vue');

	@Component({
		components: {
			Calendar,
		},
	})
	export default class TaskCalendarSection extends Vue {
		@Getter('tasks/getTasks') private tasks!: ITask[];

		// TODO move to created
		private openTaskModal(id: string) {
			if (this.$route.name === 'calendarTaskModal') {
				this.$router.replace({ path: `${id}` });
			} else {
				this.$router.push({ name: 'calendarTaskModal', params: { id } });
			}
		}

		// TODO move to created
		private openTasksModal(day: Date) {
			this.$router.push({
				name: 'calendarTasksModal',
				params: { date: `${day}` },
			});
		}

		// TODO move to created
		private openCreateModal(day: Date) {
			this.$router.push({
				name: 'calendarCreateTaskModal',
				params: { date: `${day}` },
			});
		}

		private created() {
			EventBus.$on('task-modal', (id: string) => {
				this.openTaskModal(id);
			});

			EventBus.$on('update-task', (complete: boolean) => {
				this.$store.dispatch('tasks/updateTask', complete);
			});
		}
	}
</script>
