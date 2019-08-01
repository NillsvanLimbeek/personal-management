<template>
    <div class="create-task">
        <div class="create-task__header">
            Create task
        </div>

        <div class="create-task__body">
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
                    @select-section="newTask.taskSectionId = $event"
                />
            </div>

            <div class="create-task__description">
                <TextEditor @description="newTask.description = $event" />
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

        private newTask: ITask = {
            title: '',
            id: generateGuid(),
            completed: false,
            taskSectionId: '60c126ae-2e15-4b0e-aebd-ac2e78e80644',
            dueDate: this.date,
            description: [],
            comments: [],
        };

        private autoResize(): void {
            const textarea = document.querySelector('textarea');

            if (textarea) {
                const offset = textarea.offsetHeight - textarea.clientHeight;

                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + offset + 'px';
            }
        }

        private onSubmit() {
            this.$store.dispatch('tasks/addTask', this.newTask);
            this.$router.go(-1);
        }
    }
</script>

<style lang="scss">
    @import 'CreateTaskModal.scss';
</style>
