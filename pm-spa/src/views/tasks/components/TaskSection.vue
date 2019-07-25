<template>
    <div class="task-section">
        <div class="task-section__body">
            <div class="task-section__body--title">
                <TaskSectionDropdown
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

                <div
                    v-if="taskSection.isOpen"
                    class="task-section__sort"
                    @click="sortName"
                >
                    <span>Sort</span>

                    <i class="fas fa-arrows-alt-v" />
                </div>
            </div>

            <div class="task-section__body--date">
                <div
                    v-if="taskSection.isOpen"
                    class="task-section__sort"
                    @click="sortDate"
                >
                    <span>Sort</span>

                    <i class="fas fa-arrows-alt-v" />
                </div>
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
    import { generateGuid } from '@/utils';
    import { SortDirection, SortType } from '@data/type';

    const TaskSectionDropdown = () =>
        import('@components/dropdowns/TaskSectionDropdown.vue');
    const Task = () => import('./Task.vue');
    const InlineEdit = () => import('@components/inline-edit/InlineEdit.vue');

    @Component({
        components: {
            TaskSectionDropdown,
            Task,
            InlineEdit,
        },
    })
    export default class TaskSection extends Vue {
        @Prop({ required: true }) private taskSection!: ITaskSection;
        @Prop({ required: true }) private tasks!: ITask[];

        private sectionTitle: string = '';
        private newTaskTitle: string = '';
        private triggerEdit: boolean = false;

        private get getTasks(): ITask[] {
            return this.tasks.filter((task) => {
                return task.taskSectionId === this.taskSection.id;
            });
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

        //TODO
        private sortName() {
            this.taskSection.sort === 'up'
                ? (this.taskSection.sort = 'down')
                : (this.taskSection.sort = 'up');

            this.$store.dispatch('tasks/sortName', {
                id: this.taskSection.id,
                sort: this.taskSection.sort,
            });
        }

        // TODO
        private sortDate() {
            this.taskSection.sort === 'up'
                ? (this.taskSection.sort = 'down')
                : (this.taskSection.sort = 'up');

            this.$store.dispatch('tasks/sortDate', {
                id: this.taskSection.id,
                sort: this.taskSection.sort,
            });
        }
    }
</script>

<style lang="scss">
    @import 'TaskSection.scss';
</style>
