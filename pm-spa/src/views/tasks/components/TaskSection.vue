<template>
    <div class="task-section">
        <div class="task-section__body">
            <div class="task-section__body--title">
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
                    @sort="sortTasks('name')"
                    @cancel="cancelSort"
                    @save="saveSortedTasks"
                />

            </div>

            <div class="task-section__body--date">
                <SortButton
                    v-if="taskSection.isOpen"
                    @sort="sortTasks('date')"
                    @cancel="cancelSort"
                />
            </div>
        </div>

        <div
            class="task-section_list"
            v-if="taskSection.isOpen"
        >
            <Task
                :key="task.id"
                :task="task"
                v-for="task in getTasks"
                @update-task="$emit('update-task', $event)"
            />

            <div class="task-section__add">
                <i class="fas fa-plus" />

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
    import { Vue, Component, Prop } from '@/vue-script';

    import { ITaskSection, ITask } from '@models/index';

    import { EventBus } from '@/event-bus';
    import { generateGuid, sortBy } from '@/utils';
    import { SortDirection, SortType } from '@data/type';

    const TaskSectionDropdown = () =>
        import('@components/dropdowns/TaskSectionDropdown.vue');
    const Task = () => import('./Task.vue');
    const InlineEdit = () => import('@components/inline-edit/InlineEdit.vue');
    const SortButton = () => import('@components/sort/SortButton.vue');

    @Component({
        components: {
            TaskSectionDropdown,
            Task,
            InlineEdit,
            SortButton,
        },
    })
    export default class TaskSection extends Vue {
        @Prop({ required: true }) private taskSection!: ITaskSection;
        @Prop({ required: true }) private tasks!: ITask[];

        private sectionTitle: string = '';
        private newTaskTitle: string = '';
        private triggerEdit: boolean = false;
        private sortDirection: SortDirection | null = null;
        private sortType: SortType | null = null;

        private get getTasks(): ITask[] {
            let tasks = this.tasks.filter((task) => {
                return task.taskSectionId === this.taskSection.id;
            });

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

            return tasks;
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

            if (this.taskSection && this.taskSection.taskIds) {
                await this.taskSection.taskIds.forEach((id) => {
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
        }

        private cancelSort() {
            this.sortDirection = null;
            this.sortType = null;
        }

        private saveSortedTasks() {
            const tasks = this.getTasks;

            this.$store
                .dispatch('tasks/deleteByTaskSectionId', this.taskSection.id)
                .then(() => this.$store.dispatch('tasks/saveSortedTasks', tasks));

            this.cancelSort();
        }
    }
</script>

<style lang="scss" src="./TaskSection.scss">
</style>
