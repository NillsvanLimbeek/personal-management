<template>
	<div class="week">
		<div class="week__weekdays">
			<span v-for="day in getWeekDays">
				{{ day | date('EEE') }}
			</span>
		</div>

		<div class="week__days">
			<div
				v-for="(day, index) in getDaysInWeek"
				class="week__day"
				:class="{ 'week__day--today': isToday(day) }"
				:key="index"
				@click="$emit('create-task', day)"
				@mouseenter="showAdd = index"
				@mouseleave="showAdd = null"
			>

				<div class="week__day-header">
					{{ day | date('d') }}
				</div>

				<CalendarTask
					v-for="(task, index) in filteredTasks(day)"
					:key="index"
					:task="task"
				/>

				<span
					v-if="showAdd === index && filteredTasks(day).length == 0"
					:key="index"
					class="week__add"
				>
					<i class="fas fa-plus"></i> Add
				</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from '@/vue-script';

	import {
		getDaysInMonth,
		addDays,
		startOfMonth,
		getDay,
		eachDayOfInterval,
		startOfWeek,
		endOfWeek,
		format,
		isToday,
		addMonths,
		subMonths,
		setDate,
		isSameMonth,
		isSameDay,
	} from 'date-fns';

	import { ITask } from '@/data/models';

	const CalendarTask = () => import('../calendar-task/CalendarTask.vue');

	@Component({
		components: {
			CalendarTask,
		},
	})
	export default class Month extends Vue {
		@Prop({ required: true }) private date!: Date;
		@Prop({ required: true }) private tasks!: ITask[];

		private showAdd: boolean = false;

		private get getWeekDays(): Date[] {
			const today = Date.now();

			return eachDayOfInterval({
				start: startOfWeek(today),
				end: endOfWeek(today),
			});
		}

		private get getDaysInWeek() {
			return eachDayOfInterval({
				start: startOfWeek(this.date),
				end: endOfWeek(this.date),
			});
		}

		private sameDay(day: Date, task: ITask) {
			return isSameDay(day, task.dueDate as Date);
		}

		private isToday(date: Date) {
			return isToday(date);
		}

		private filteredTasks(date: Date) {
			if (this.tasks) {
				return this.tasks.filter((task) => {
					if (task.dueDate) {
						return isSameDay(task.dueDate, date);
					}
				});
			}
		}
	}
</script>

<style lang="scss" src="./Week.scss">
</style>
