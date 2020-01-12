<template>
	<div class="calendar">
		<div class="calendar__header">
			<div class="calendar__view">
				<BaseButton @click="switchView('week')">
					Week
				</BaseButton>

				<BaseButton @click="switchView('month')">
					Month
				</BaseButton>
			</div>

			<i
				class="calendar__arrow fas fa-chevron-left"
				@click="switchDate('previous')"
			/>

			<span v-if="view === 'month'">{{ date | date('MMMM yyyy') }}</span>
			<span v-if="view === 'week'">Week {{ date | date('w') }}</span>

			<i
				class="calendar__arrow fas fa-chevron-right"
				@click="switchDate('next')"
			/>

			<BaseButton
				class="calendar__button calendar__button--right"
				@click="switchDate('today')"
			>
				Today
			</BaseButton>
		</div>

		<Month
			v-if="view === 'month'"
			:date="date"
			:tasks="tasks"
			@create-task="$emit('create-task', $event)"
			@calendar-task-modal="$emit('calendar-task-modal', $event)"
		/>

		<Week
			v-if="view === 'week'"
			:date="date"
			:tasks="tasks"
			@create-task="$emit('create-task', $event)"
		/>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop, Getter } from '@/vue-script';

	import { ITask } from '@data/models';

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
		addWeeks,
		subWeeks,
	} from 'date-fns';

	const BaseButton = () => import('@/components/base-button/BaseButton.vue');
	const Month = () => import('./month/Month.vue');
	const Week = () => import('./week/Week.vue');

	@Component({
		components: {
			BaseButton,
			Month,
			Week,
		},
	})
	export default class Calendar extends Vue {
		@Prop() private tasks!: ITask[];

		private date: Date = startOfMonth(new Date());
		private showAdd: boolean = false;
		private view: 'week' | 'month' = 'month';

		private switchDate(date: string) {
			this.view === 'month' ? this.switchMonth(date) : this.switchWeek(date);
		}

		private switchMonth(date: string) {
			switch (date) {
				case (date = 'today'):
					this.date = startOfMonth(new Date());
					break;
				case (date = 'next'):
					this.date = addMonths(this.date, 1);
					break;
				case (date = 'previous'):
					this.date = subMonths(this.date, 1);
					break;
			}
		}

		private switchWeek(date: string) {
			switch (date) {
				case (date = 'today'):
					this.date = startOfWeek(new Date());
					break;
				case (date = 'next'):
					this.date = addWeeks(this.date, 1);
					break;
				case (date = 'previous'):
					this.date = subWeeks(this.date, 1);
					break;
			}
		}

		private switchView(view: 'week' | 'month') {
			this.view = view;
			this.view === 'month'
				? this.switchMonth('today')
				: this.switchWeek('today');
		}
	}
</script>

<style lang="scss" src="./Calendar.scss">
</style>
