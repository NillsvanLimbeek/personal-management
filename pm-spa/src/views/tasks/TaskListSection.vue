<template>
    <div class="tasks">
        <div class="tasks__header">
            <button class="tasks__button button">Add Task</button>
            <button class="tasks__button button">Add Section</button>
        </div>

        <div class="tasks__section">
            <TaskSection
                :key="taskSections.id"
                :task-section="taskSection"
                :tasks="tasks"
                @section-title="updateSection($event)"
                v-for="taskSection in taskSections"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Getter } from '@/vue-script';

    import { ITaskState } from '@state/index';
    import { ITask, ITaskSection } from '@models/index';

    const TaskSection = () => import('@components/tasks/TaskSection.vue');

    @Component({
        components: {
            TaskSection,
        },
    })
    export default class TaskListSection extends Vue {
        @Getter('tasks/getTaskSections') private taskSections!: ITaskSection[];
        @Getter('tasks/getTasks') private tasks!: ITask[];

        private updateSection(payload: any) {
            console.log(payload);
        }
    }
</script>
