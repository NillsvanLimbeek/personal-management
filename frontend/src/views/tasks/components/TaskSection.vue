<template>
    <div class="task-section">
        <div
            class="task-section__header"
            :class="{ 'task-section__header--closed': !taskSection.isOpen }"
        >
            <div class="task-section__header--title">
                <TaskSectionDropdown
                    class="task-section__dropdown"
                    :is-open="taskSection.isOpen"
                    @collapse-section="collapseSection"
                    @delete-section="deleteSection"
                    @duplicate-section="duplicateSection"
                    @rename-section="triggerEdit = true"
                    @complete-tasks="completeTasks"
                />

                <i
                    class="task-section__arrow fas fa-chevron-right"
                    :class="{
                        'task-section__arrow--closed': taskSection.isOpen,
                    }"
                    @click="collapseSection"
                />

                <InlineEdit
                    :title="taskSection.title"
                    :trigger-edit="triggerEdit"
                    @update-title="renameSection($event)"
                />

                <SortButton
                    v-if="taskSection.isOpen"
                    @sort="sortTasks('title')"
                />
            </div>

            <div class="task-section__header--date">
                <SortButton
                    v-if="taskSection.isOpen"
                    @sort="sortTasks('date')"
                />
            </div>
        </div>

        <div class="task-section__body" v-if="taskSection.isOpen">
            <Draggable
                v-model="getTasks"
                v-bind="dragOptions"
                group="tasks"
                :move="onDragStart"
                @end="drag = false"
            >
                <Task
                    :key="task"
                    :task-id="task"
                    v-for="task in getTasks"
                    @update-task="$emit('update-task', $event)"
                />
            </Draggable>

            <div class="task-section__add">
                <i class="fas fa-plus" />

                <!-- TODO usee base input -->
                <input
                    placeholder="Add new task"
                    @blur="addTask"
                    @keyup.enter="addTask"
                    type="text"
                    class="input"
                    v-model="newTaskTitle"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Getter } from '@/vue-script';

import { ITaskSection, ITask } from '@models/index';

import { EventBus } from '@/event-bus';
import { generateGuid, sortBy } from '@/utils';
import { SortDirection, SortType } from '@data/type';

import Draggable from 'vuedraggable';

const TaskSectionDropdown = () =>
    import('@components/dropdowns/TaskSectionDropdown.vue');
const Task = () => import('./Task.vue');
const InlineEdit = () => import('@components/inline-edit/InlineEdit.vue');
const SortButton = () => import('@components/sort/SortButton.vue');

@Component({
    components: {
        Draggable,
        TaskSectionDropdown,
        Task,
        InlineEdit,
        SortButton,
    },
})
export default class TaskSection extends Vue {
    @Getter('taskSections/getTaskSections')
    private taskSections!: ITaskSection[];
    @Getter('tasks/getTasks') private tasks!: ITask[];

    @Prop({ required: true }) private taskSection!: ITaskSection;

    private sectionTitle: string = '';
    private newTaskTitle: string = '';
    private triggerEdit: boolean = false;
    private sortDirection: SortDirection | null = null;
    private sortType: SortType | null = null;
    private drag: boolean = false;

    private get dragOptions() {
        return {
            animation: 200,
            disabled: false,
            ghostClass: 'ghost',
        };
    }

    private onDragStart() {
        this.drag = true;
    }

    private get getTasks(): string[] {
        if (this.taskSection.taskIds) {
            return this.taskSection.taskIds;
        }

        return [];
    }

    private set getTasks(taskIds: string[]) {
        this.drag = false;
        const tasksSectionIds = this.taskSection.taskIds;

        // compare tasksection.taskids with taskids
        if (tasksSectionIds.length !== taskIds.length) {
            // extract new id
            taskIds.forEach((id) => {
                if (!tasksSectionIds.includes(id)) {
                    const task = this.tasks.find((x) => x.id === id);

                    if (task) {
                        // update tasksectionid of task
                        const newTask = {
                            ...task,
                            taskSectionId: this.taskSection.id,
                        };

                        this.updateTask(newTask);

                        // remove id from old taskSection
                        const taskSection = this.taskSections.find(
                            (x) => x.id === task.taskSectionId,
                        );

                        if (taskSection) {
                            this.updateTaskSection(taskSection, id);
                        }
                    }
                }
            });
        }

        this.$store.dispatch('taskSections/updateTasksIdsOrder', {
            sectionId: this.taskSection.id,
            taskIds,
        });
    }

    private updateTask(task: ITask) {
        const newTask = {
            ...task,
            taskSectionId: this.taskSection.id,
        };

        this.$store.dispatch('tasks/updateTask', newTask);
    }

    private updateTaskSection(taskSection: ITaskSection, id: string) {
        const taskIds = taskSection.taskIds.filter((x) => id !== id);
        const newSection = { ...taskSection, taskIds };

        this.$store.dispatch('taskSections/updateSection', newSection);
    }

    private collapseSection(): void {
        this.taskSection.isOpen = !this.taskSection.isOpen;

        this.$store.dispatch('taskSections/updateSection', {
            id: this.taskSection.id,
            isOpen: this.taskSection.isOpen,
        });
    }

    private updateSection(): void {
        const input = this.$refs.sectionTitle as HTMLInputElement;

        this.$store.dispatch('taskSections/updateSection', {
            id: this.taskSection.id,
            title: input.value,
        });

        this.sectionTitle = '';
        input.blur();
    }

    private addTask(): void {
        const task: ITask = {
            id: generateGuid(),
            taskSectionId: this.taskSection.id,
            title: this.newTaskTitle,
            completed: false,
            comments: [],
        };

        if (this.newTaskTitle) {
            this.$store.dispatch('tasks/addTask', task);
            this.$store.dispatch('taskSections/addTaskToSection', {
                taskId: task.id,
                taskSectionId: task.taskSectionId,
            });
        }

        this.newTaskTitle = '';
    }

    private completeTasks(taskIds: string[]): void {
        if (this.taskSection && this.taskSection.taskIds) {
            this.taskSection.taskIds.forEach((id) => {
                this.$store.dispatch('tasks/updateTask', {
                    id,
                    completed: true,
                });
            });
        }
    }

    private deleteSection(): void {
        this.$store.dispatch('taskSections/deleteSection', this.taskSection.id);
        this.$store.dispatch('tasks/deleteTasks', this.taskSection.taskIds);
    }

    private async duplicateSection() {
        const section: ITaskSection = await this.$store.dispatch(
            'taskSections/duplicateSection',
            this.taskSection.id,
        );

        this.taskSection.taskIds.forEach((id) => {
            this.$store
                .dispatch('tasks/duplicateTask', {
                    taskId: id,
                    taskSectionId: section.id,
                })
                .then((taskId) => {
                    this.$store.dispatch('taskSections/addTaskToSection', {
                        taskId,
                        taskSectionId: section.id,
                    });
                });
        });
    }

    private renameSection(title: string): void {
        if (this.taskSection) {
            this.$store.dispatch('taskSections/updateSection', {
                id: this.taskSection.id,
                title,
            });
        }

        this.triggerEdit = false;
    }

    private sortTasks(type: SortType) {
        type === 'title' ? (this.sortType = 'title') : (this.sortType = 'date');

        switch (this.sortDirection) {
            case null:
                this.sortDirection = 'up';
                break;
            case 'up':
                this.sortDirection = 'down';
                break;
            case 'down':
                this.sortDirection = 'up';
                break;
        }

        this.getSortedTasks();
    }

    private getSortedTasks() {
        const taskList: ITask[] = this.$store.getters['tasks/getTasks'];
        let tasks = taskList.filter(
            (task) => task.taskSectionId === this.taskSection.id,
        );

        if (this.sortType === 'title') {
            if (this.sortDirection === 'up') {
                tasks = sortBy(tasks, 'title');
            } else {
                tasks = sortBy(tasks, 'title').reverse();
            }
        } else if (this.sortType === 'date') {
            if (this.sortDirection === 'up') {
                tasks = sortBy(tasks, 'date');
            } else {
                tasks = sortBy(tasks, 'date').reverse();
            }
        }

        this.$store.dispatch('taskSections/updateTasksIdsOrder', {
            sectionId: this.taskSection.id,
            taskIds: tasks.map((task) => task.id),
        });
    }
}
</script>

<style lang="scss" src="./TaskSection.scss"></style>
