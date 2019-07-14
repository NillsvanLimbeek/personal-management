<template>
    <div class="task-modal">
        <div class="task-modal__header">
            <div class="task-modal__complete">
                <div
                    :class="{ 'task__checkbox--active': getTask.completed }"
                    class="task__checkbox"
                    @click="updateTask(getTask.completed)"
                />

                Task {{ getTask.completed ? 'Complete' : 'Not complete' }}
            </div>

        </div>

        <div class="task-modal__body">
            <div class="task-modal__title">
                <textarea
                    rows="1"
                    @input="autoResize"
                    v-model="getTask.title"
                    class="text-area"
                />
                </div>

            <div class="task-modal__assigned-to">
                <i class="far fa-user"></i>
            </div>

            <div class="task-modal__due-date">
                <Datepicker
                    :date="getTask.dueDate"
                    @select-date="updateDueDate($event)"  />
            </div>

            <div class="task-modal__description">
                <TextEditor
                    :task="getTask"
                    @description="updateDescription($event)" />
            </div>

            <div class="task-modal__comments"></div>
        </div>

        <div class="task-modal__footer"></div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Getter } from '@/vue-script';

    import { ITask } from '@data/models';

    const Datepicker = () => import('@components/datepicker/Datepicker.vue');
    const TextEditor = () => import('@components/editor/TextEditor.vue');

    @Component({
        components: {
            Datepicker,
            TextEditor,
        },
    })
    export default class ModalRight extends Vue {
        @Getter('tasks/getTasks') private tasks!: ITask[];

        private get getTask(): ITask | undefined {
            return this.tasks.find((x) => x.id === this.$route.params.id);
        }

        private updateTask(msg: boolean): void {
            if (this.getTask) {
                this.getTask.completed = msg === true ? false : true;
                this.$store.dispatch('tasks/updateTask', this.getTask.completed);
            }
        }

        private autoResize(): void {
            const textarea = document.querySelector('textarea');

            if (textarea) {
                const offset = textarea.offsetHeight - textarea.clientHeight;

                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + offset + 'px';
            }
        }

        private updateDueDate(date: Date) {
            if (this.getTask) {
                this.$store.dispatch('tasks/updateTask', {
                    id: this.getTask.id,
                    dueDate: date,
                });
            }
        }

        private updateDescription(description: object): void {
            if (this.getTask) {
                this.$store.dispatch('tasks/updateTask', {
                    id: this.getTask.id,
                    description,
                });
            }
        }
    }
</script>

<style lang="scss">
    @import 'task-modal.scss';
</style>
