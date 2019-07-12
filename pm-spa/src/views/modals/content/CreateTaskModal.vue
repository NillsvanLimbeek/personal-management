<template>
    <div class="create-task">
        <div class="create-task__header">
            Create task
        </div>

        <div class="create-task__body">
            <div class="create-task__title">
                <textarea
                    rows="1"
                    @input="autoResize"
                    placeholder="Task title"
                    v-model="newTask.title"
                    class="text-area"
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

            <!-- <div class="create-task__task-section">

            </div> -->

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
    import { Vue, Component, Prop } from '@/vue-script';

    import { ITask } from '@data/models';
    import { generateGuid } from '@/utils';

    const Datepicker = () => import('@components/datepicker/Datepicker.vue');
    const TextEditor = () => import('@components/editor/TextEditor.vue');

    @Component({
        components: {
            Datepicker,
            TextEditor,
        },
    })
    export default class CreateTaskModal extends Vue {
        @Prop() private date!: Date;

        private newTask: ITask = {
            title: '',
            id: generateGuid(),
            completed: false,
            taskSectionId: '60c126ae-2e15-4b0e-aebd-ac2e78e80644',
            dueDate: this.date,
            description: [],
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
