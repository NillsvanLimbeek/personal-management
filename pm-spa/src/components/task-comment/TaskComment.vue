<template>
    <div class="task-comment">
        <ProfilePicture class="task-comment__profile" />

        <div class="task-comment__body">
            <div class="task-comment__title">
                <span class="task-comment__name">
                    {{ comment.createdBy }}
                </span>

                <span class="task-comment__date">
                    {{ dateCreated }}
                </span>

                <TaskCommentDropdown />
            </div>

            <editor-content
                class="task-comment__comment"
                :editor="editor"
            />
        </div>

    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from '@/vue-script';

    import { IComment } from '@data/models';
    import { formatDistance, format } from 'date-fns';

    // @ts-ignore
    import { Editor, EditorContent } from 'tiptap';
    import {
        Bold,
        Italic,
        Underline,
        Strike,
        BulletList,
        OrderedList,
        ListItem,
        // @ts-ignore
    } from 'tiptap-extensions';

    const ProfilePicture = () =>
        import('@components/profile-picture/ProfilePicture.vue');
    const TaskCommentDropdown = () =>
        import('@/components/dropdowns/TaskCommentDropdown.vue');

    @Component({
        components: {
            EditorContent,
            ProfilePicture,
            TaskCommentDropdown,
        },
    })
    export default class TaskComment extends Vue {
        @Prop({ required: true }) private comment!: IComment;

        private editor: any = null;

        private get dateCreated(): string {
            return formatDistance(this.comment.createdAt, Date.now(), {
                addSuffix: true,
            });
        }

        private mounted() {
            this.editor = new Editor({
                extensions: [
                    new Bold(),
                    new Italic(),
                    new Underline(),
                    new Strike(),
                    new BulletList(),
                    new OrderedList(),
                    new ListItem(),
                ],
                editable: false,
                content: JSON.parse(this.comment.description),
            });
        }

        private beforeDestroy() {
            this.editor.destroy();
        }
    }
</script>

<style lang="scss" src="./TaskComment.scss">
</style>
