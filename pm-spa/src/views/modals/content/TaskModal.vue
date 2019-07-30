<template>
    <div class="task-modal">
        <div class="task-modal__header">
            <div class="task-modal__complete">
                <Checkbox
                    :active="getTask.completed"
                    @click="updateTask(getTask.completed)"
                />

                Task {{ getTask.completed ? 'Complete' : 'Not complete' }}
            </div>

        </div>

        <div class="task-modal__body">
            <div class="task-modal__title">
                <TextArea
                    :title="getTask.title"
                    @input="getTask.title = $event"
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

    const Checkbox = () => import('@components/checkbox/Checkbox.vue');
    const Datepicker = () => import('@components/datepicker/Datepicker.vue');
    const TextEditor = () => import('@components/editor/TextEditor.vue');
    const TextArea = () => import('@components/text-area/TextArea.vue');

    @Component({
        components: {
            Checkbox,
            Datepicker,
            TextEditor,
            TextArea,
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

        private updateDueDate(date: Date): void {
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
    @import 'TaskModal.scss';
</style>
