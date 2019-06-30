<template>
    <div class="modals-container">
        <div class="modals-container__header">
            <div class="modals-container__complete">
                <div
                    :class="{ 'task__checkbox--active': getTask.completed }"
                    class="task__checkbox"
                    @click="updateTask(getTask.completed)"
                />

                Task {{ getTask.completed ? 'Complete' : 'Not complete' }}
            </div>

            <i
                @click="$router.go(-1)"
                class="modals-container__close fas fa-times"
            />
        </div>

        <div class="modals-container__body">
            <div class="modals-container__title">
                <textarea
                    rows="1"
                    @input="autoResize"
                    v-model="getTask.title"
                    class="text-area"
                />
                </div>

            <div class="modals-container__assigned-to">
                <i class="far fa-user"></i>
            </div>

            <div class="modals-container__due-date">
                <Datepicker
                    :date="getTask.dueDate"
                    @select-date="updateDueDate($event)"  />
            </div>

            <div class="modals-container__description">
                <TextEditor />
            </div>

            <div class="modals-container__comments"></div>
        </div>

        <div class="modals-container__footer"></div>
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
    export default class ModalsContainer extends Vue {
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
    }
</script>
