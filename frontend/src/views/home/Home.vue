<template>
    <div class="home">
        <TasksWidget v-bind:widget-data="completedTasks" />
        <TasksWidget v-bind:widget-data="overdueTasks" />

        <transition name="modal-center">
            <router-view />
        </transition>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Getter } from '@/vue-script';

    import { ITask, IProgressRingData, ITasksWidgetData } from '@/data/models';
    import { EventBus } from '@/event-bus';
    import { isBefore } from 'date-fns';

    const TasksWidget = () => import('@/components/tasks-widget/TasksWidget.vue');

    @Component({
        components: {
            TasksWidget,
        },
    })
    export default class Home extends Vue {
        @Getter('tasks/getTasks') private tasks!: ITask[];

        private get completedTasks(): ITasksWidgetData {
            return {
                title: 'Completed Tasks',
                stroke: '#4680ff',
                progressRing: this.getCompletedTasks,
                tasks: this.tasks,
            };
        }

        private get getCompletedTasks(): IProgressRingData {
            const totalTasks = this.tasks.length;
            const completedTasks = this.tasks.filter(
                (task) => task.completed === true,
            ).length;
            const percent = (completedTasks / totalTasks) * 100;

            return { totalTasks, completedTasks, percent };
        }

        private get overdueTasks(): ITasksWidgetData {
            return {
                title: 'Overdue Tasks',
                stroke: '#fb617f',
                progressRing: this.getOverdueTasks,
                tasks: this.tasks.filter((task) => task.dueDate),
            };
        }

        private get getOverdueTasks(): IProgressRingData {
            const tasks = this.tasks.filter((task) => task.dueDate);
            const tasksOverdue = tasks.filter((task) => {
                if (task.dueDate) {
                    return !task.completed && isBefore(task.dueDate, Date.now());
                }
            });

            const percent = (tasksOverdue.length / tasks.length) * 100;

            return {
                totalTasks: tasks.length,
                completedTasks: tasksOverdue.length,
                percent,
            };
        }

        private created() {
            EventBus.$on('update-task', (task: ITask) => {
                this.$store.dispatch('tasks/updateTask', task);
            });

            EventBus.$on('open-task', (id: string) => {
                this.$router.push({ path: `home/task/${id}` });
            });
        }
    }
</script>
