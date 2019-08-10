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

        <div
            class="task-modal__body"
            :style="{ height: `calc(100vh - ${commentsEditorHeight + 80}px)` }"
        >
            <div class="task-modal__body-top">
                <div class="task-modal__title">
                    <TextArea
                        @input="getTask.title = $event"
                        :title="getTask.title"
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
            </div>

            <div class="task-modal__body-middle">
                <div class="task-modal__description">
                    <TextEditor
                        :task="getTask"
                        placeholder="Task description"
                        @description="updateDescription($event)" />
                </div>

                <div class="task-modal__comments">
                    <TaskComment
                        v-for="(comment, index) in getTask.comments"
                        :key="index"
                        :comment="comment"
                    />
                </div>
            </div>
        </div>

        <div class="task-modal__footer">
            <TextEditor
                ref="editor"
                placeholder="Add a comment"
                has-button="true"
                @input="resizeModalBody"
                @comment="addTaskComment($event)" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Getter } from '@/vue-script';

    import { ITask } from '@data/models';

    const Checkbox = () => import('@components/checkbox/Checkbox.vue');
    const Datepicker = () => import('@components/datepicker/Datepicker.vue');
    const TextEditor = () => import('@components/editor/TextEditor.vue');
    const TextArea = () => import('@components/text-area/TextArea.vue');
    const TaskComment = () => import('@components/task-comment/TaskComment.vue');

    @Component({
        components: {
            Checkbox,
            Datepicker,
            TextEditor,
            TextArea,
            TaskComment,
        },
    })
    export default class ModalRight extends Vue {
        @Getter('tasks/getTasks') private tasks!: ITask[];

        private commentsEditorHeight: number | null = null;

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

        private addTaskComment(comment: object): void {
            if (this.getTask) {
                this.$store.dispatch('tasks/addComment', {
                    id: this.getTask.id,
                    comment,
                });
            }
        }

        private resizeModalBody(): void {
            const footer = document.querySelector(
                '.task-modal__footer',
            ) as HTMLElement;

            if (footer) {
                this.commentsEditorHeight = footer.offsetHeight;
            }
        }
    }
</script>

<style lang="scss" src="./TaskModal.scss">
</style>
