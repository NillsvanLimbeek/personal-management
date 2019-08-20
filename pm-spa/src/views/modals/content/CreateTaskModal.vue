<template>
    <div class="create-task">
        <div class="create-task__header">
            Create task
        </div>

        <div class="create-task__body">
            <div class="create-task__body-top">
                <div class="create-task__title">
                    <TextArea
                        @input="newTask.title = $event"
                        :title="newTask.title"
                    />
                    </div>

                <div class="create-task__assigned-to">
                    <i class="far fa-user"></i>
                </div>

                <div class="create-task__due-date">
                    <Datepicker
                        :date="newTask.dueDate"
                        @select-date="newTask.dueDate = $event"  />
                </div>

                <div class="create-task__task-section">
                    <ModalTaskSectionDropdown
                        :task-sections="taskSections"
                        :selected-item="selectedTaskSection.title"
                        @select-section="taskSection = $event"
                    />
                </div>
            </div>

            <div class="create-task__description">
                <TextEditor
                    placeholder="Task description"
                    @description="newTask.description = $event" />
            </div>
        </div>

        <div class="create-task__footer">
            <button
                class="button"
                :disabled="!newTask.title"
                @click="onSubmit">

                    Create
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Getter } from '@/vue-script';

    import { ITask, ITaskSection } from '@data/models';
    import { generateGuid } from '@/utils';

    const Datepicker = () => import('@components/datepicker/Datepicker.vue');
    const TextEditor = () => import('@components/editor/TextEditor.vue');
    const ModalTaskSectionDropdown = () =>
        import('@components/dropdowns/ModalTaskSectionDropdown.vue');
    const TextArea = () => import('@components/text-area/TextArea.vue');

    @Component({
        components: {
            Datepicker,
            TextEditor,
            ModalTaskSectionDropdown,
            TextArea,
        },
    })
    export default class CreateTaskModal extends Vue {
        @Getter('taskSections/getTaskSections')
        private taskSections!: ITaskSection[];

        @Prop() private date!: Date;

        private taskSection: ITaskSection | null = null;
        private newTask = {
            title: '',
            dueDate: this.date,
            description: '',
        };

        private get selectedTaskSection() {
            if (this.taskSection !== null) {
                return this.taskSection;
            } else {
                return this.taskSections[0];
            }
        }

        private async onSubmit() {
            const task: ITask = {
                ...this.newTask,
                id: generateGuid(),
                comments: [],
                completed: false,
                taskSectionId: this.selectedTaskSection.id,
            };

            await this.$store.dispatch('tasks/addTask', task);
            await this.$store.dispatch('taskSections/addTaskToSection', {
                taskId: task.id,
                taskSectionId: task.taskSectionId,
            });

            this.$router.go(-1);
        }
    }
</script>

<style lang="scss" src="./CreateTaskModal.scss">
</style>
