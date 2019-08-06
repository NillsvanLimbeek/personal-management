<template>
    <div class="task-comment">
        <ProfilePicture />
        <editor-content :editor="editor" />
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from '@/vue-script';

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

    @Component({
        components: {
            EditorContent,
            ProfilePicture,
        },
    })
    export default class TaskComment extends Vue {
        @Prop() private comment!: string;

        private editor: any = null;

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
                content: JSON.parse(this.comment),
            });
        }

        private beforeDestroy() {
            this.editor.destroy();
        }
    }
</script>

<style lang="scss" src="./TaskComment.scss">
</style>
