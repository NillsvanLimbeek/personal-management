<template>
    <div class="home">
        <div class="column">
            <h3>Completed Tasks</h3>
            <ProgressRing
                stroke="blue"
                v-bind:taskData="completedTasks"
            />
        </div>

        <div class="column">
            <h3>Overdue</h3>
            <ProgressRing
                stroke="red"
                v-bind:taskData="overdueTasks"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Getter } from '@/vue-script';

    import { ITask, IProgressRingData } from '@/data/models';

    import { isBefore } from 'date-fns';

    const ProgressRing = () =>
        import('@/components/progress-ring/ProgressRing.vue');

    @Component({
        components: {
            ProgressRing,
        },
    })
    export default class Home extends Vue {
        @Getter('tasks/getTasks') private tasks!: ITask[];

        private get completedTasks(): IProgressRingData {
            const totalTasks = this.tasks.length;
            const completedTasks = this.tasks.filter(
                (task) => task.completed === true,
            ).length;
            const percent = (completedTasks / totalTasks) * 100;

            return { totalTasks, completedTasks, percent };
        }

        private get overdueTasks(): IProgressRingData {
            const tasksWithDate = this.tasks
                .filter((task) => task.dueDate)
                .filter((task) => task.completed === false);

            const tasksOverdue = [];
            tasksWithDate.forEach((task) => {
                const date = task.dueDate;
                if (date) {
                    if (isBefore(date, Date.now())) {
                        tasksOverdue.push(task);
                    }
                }
            });

            const percent = (tasksOverdue.length / tasksWithDate.length) * 100;

            return {
                totalTasks: tasksWithDate.length,
                completedTasks: tasksOverdue.length,
                percent,
            };
        }
    }
</script>
