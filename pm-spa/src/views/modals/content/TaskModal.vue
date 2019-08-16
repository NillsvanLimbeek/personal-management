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
                        v-for="(comment, index) in getComments"
                        :key="index"
                        :comment="comment"
                        @delete-comment="deleteTaskComment($event)"
                        @edit-comment="edit = $event;"
                    />
                </div>
            </div>
        </div>

        <div class="task-modal__footer">
            <TextEditor
                ref="editor"
                placeholder="Add a comment"
                has-button="true"
                :edit="edit"
                @input="resizeModalBody"
                @add-comment="addTaskComment($event)"
                @update-comment="updateTaskComment($event)"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Getter } from '@/vue-script';

    import { ITask, IComment } from '@data/models';
    import { generateGuid } from '@utils/index';

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
        @Getter('comments/getComments') private comments!: IComment[];

        private commentsEditorHeight: number | null = null;
        private edit: IComment | null = null;

        private get getTask(): ITask | undefined {
            return this.tasks.find((task) => task.id === this.$route.params.id);
        }

        private get getComments() {
            return this.comments.filter(
                (comment) => comment.taskId === this.$route.params.id,
            );
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

        private async addTaskComment(description: string) {
            if (this.getTask) {
                const comment: IComment = {
                    createdAt: new Date(),
                    createdBy: 'Nills van Limbeek',
                    id: generateGuid(),
                    taskId: this.getTask.id,
                    description,
                };

                await this.$store.dispatch('comments/addComment', comment);
                this.$store.dispatch('tasks/addCommentId', {
                    commentId: comment.id,
                    taskId: comment.taskId,
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

        private async deleteTaskComment(comment: IComment) {
            await this.$store.dispatch('comments/deleteComment', comment.id);
            this.$store.dispatch('tasks/deleteCommentId', {
                commentId: comment.id,
                taskId: comment.taskId,
            });
        }

        private updateTaskComment(comment: IComment) {
            this.$store.dispatch('comments/updateComment', comment);
            this.edit = null;
        }
    }
</script>

<style lang="scss" src="./TaskModal.scss">
</style>
