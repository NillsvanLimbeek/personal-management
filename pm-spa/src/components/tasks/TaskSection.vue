<template>
    <div class="task-section">
        <div class="task-section__header">
            <div class="task-section__menu">
                <Dropdown
                    class="task-section__dropdown"
                    :class="{
                        'task-section__dropdown--hide': !taskSection.isOpen,
                    }"
                >
                    <DropdownItem
                        title="Collapse section"
                        @click="collapseSection"
                    />
                    <hr />
                    <DropdownItem
                        title="Delete section"
                        @click="$emit('delete-section', taskSection.id)"
                    />
                    <DropdownItem
                        title="Duplicate section"
                        @click="$emit('duplicate-section', taskSection.id)"
                    />
                </Dropdown>

                <i
                    :class="{
                        'task-section__arrow--closed': taskSection.isOpen,
                    }"
                    @click="collapseSection"
                    class="task-section__arrow fas fa-chevron-right"
                />
            </div>

            <input
                ref="sectionTitle"
                @blur="updateSection"
                @keyup.enter="updateSection"
                class="task-section__title input"
                type="text"
                v-model="taskSection.title"
            />
        </div>

        <div class="task-section_list" v-if="taskSection.isOpen">
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

    import { generateGuid } from '@/utils';

    const Task = () => import('@components/tasks/Task.vue');
    const Dropdown = () => import('@components/dropdown/Dropdown.vue');
    const DropdownItem = () => import('@components/dropdown/DropdownItem.vue');

    @Component({
        components: {
            Task,
            Dropdown,
            DropdownItem,
        },
    })
    export default class TaskSection extends Vue {
        @Prop({ required: true }) private taskSection!: ITaskSection;
        @Prop({ required: true }) private tasks!: ITask[];

        private showDropdown: boolean = false;
        private sectionTitle: string = '';
        private newTaskTitle: string = '';

        private get getTasks(): ITask[] {
            return this.tasks.filter((task) => {
                return task.taskSectionId === this.taskSection.id;
            });
        }

        private collapseSection(): void {
            this.taskSection.isOpen = !this.taskSection.isOpen;

            this.$emit('update-section', {
                id: this.taskSection.id,
                isOpen: this.taskSection.isOpen,
            });
        }

        private updateSection(): void {
            const input = this.$refs.sectionTitle as HTMLInputElement;

            const taskSection: ITaskSection = {
                id: this.taskSection.id,
                title: this.sectionTitle,
            };

            this.$emit('update-section', taskSection);
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
                this.$emit('add-task', task);
            }

            this.newTaskTitle = '';
        }
    }
</script>
