<template>
	<div class="task-mini">
		<Checkbox
			class="mr-1"
			:active="task.completed"
			@click="updateTask"
		/>

		<div
			class="task-mini__body"
			@click="openTask"
		>
			<p class="task-mini__title">
				{{ task.title }}
			</p>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from '@/vue-script';

	import { ITask } from '@/data/models';
	import { EventBus } from '@/event-bus';

	const Checkbox = () => import('@/components/checkbox/Checkbox.vue');

	@Component({
		components: {
			Checkbox,
		},
	})
	export default class TaskMini extends Vue {
		@Prop({ required: true }) private task!: ITask;

		private updateTask() {
			EventBus.$emit('update-task', {
				...this.task,
				completed: !this.task.completed,
			});
		}

		private openTask() {
			EventBus.$emit('open-task', this.task.id);
		}
	}
</script>

<style lang="scss" src="./TaskMini.scss">
</style>
