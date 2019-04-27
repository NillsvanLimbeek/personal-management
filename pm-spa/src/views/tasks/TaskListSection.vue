<template>
    <div class="tasks">
        <div class="tasks__header">
            <button class="tasks__button button">Add Task</button>
            <button class="tasks__button button">Add Section</button>
        </div>

        <TaskList :tasks="tasks"/>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Getter } from '@/vue-script';

    import { ITaskState } from '@state/index';
    import { ITask } from '@models/index';

    const TaskList = () => import('@components/tasks/TaskList.vue');

    @Component({
        components: {
            TaskList,
        },
    })
    export default class TaskListSection extends Vue {
        @Getter('tasks/getTasks') private tasks!: ITask[];
    }
</script>
