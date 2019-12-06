<template>
    <div
        class="text-editor"
        :class="{ 'text-editor--active': editorFocus }"
    >

        <EditorContent
            :doc='json'
            :editor="editor"
            class="text-editor__editor"
        />

        <EditorMenuBar
            :editor="editor"
            v-slot="{ commands, isActive, focused }"
        >
            <div
                class="text-editor__menu"
                :class="{ 'text-editor__menu--active': focused }"
            >

                <i
                    @click="commands.bold"
                    class="text-editor__icon fas fa-bold"
                    :class="{ 'text-editor__icon--active': isActive.bold() }"
                />

                <i
                    @click="commands.italic"
                    class="text-editor__icon fas fa-italic"
                    :class="{ 'text-editor__icon--active': isActive.italic() }"
                />

                <i
                    @click="commands.underline"
                    class="text-editor__icon fas fa-underline"
                    :class="{ 'text-editor__icon--active': isActive.underline() }"
                />

                <i
                    @click="commands.strike"
                    class="text-editor__icon fas fa-strikethrough"
                    :class="{ 'text-editor__icon--active': isActive.strike() }"
                />

                <i
                    @click="commands.ordered_list"
                    class="text-editor__icon fas fa-list-ol"
                    :class="{ 'text-editor__icon--active': isActive.ordered_list() }"
                />

                <i
                    @click="commands.bullet_list"
                    class="text-editor__icon fas fa-list-ul"
                    :class="{ 'text-editor__icon--active': isActive.bullet_list() }"
                />

                <BaseButton
                    v-if="hasButton"
                    @click="submitComment"
                >
                    Submit
                </BaseButton>
            </div>
        </EditorMenuBar>

    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from '@/vue-script';

    import { ITask, IComment } from '@data/models';

    // @ts-ignore
    import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
    import {
        Bold,
        Italic,
        Underline,
        Strike,
        BulletList,
        OrderedList,
        ListItem,
        Placeholder,
        // @ts-ignore
    } from 'tiptap-extensions';

    const BaseButton = () => import('@/components/base-button/BaseButton.vue');

    @Component({
        components: {
            EditorMenuBar,
            EditorContent,
            BaseButton,
        },
    })
    export default class TextEditor extends Vue {
        @Prop() private task!: ITask;
        @Prop() private placeholder!: string;
        @Prop() private hasButton!: boolean;
        @Prop() private edit!: IComment | null;

        private editor: any = null;
        private json: object = {};
        private editorFocus: boolean = false;

        @Watch('task.id')
        private setJson(): void {
            if (this.task.description) {
                this.editor.setContent(JSON.parse(this.task.description));
            }
        }

        @Watch('json')
        private updateDescription(): void {
            if (!this.hasButton) {
                this.$emit('description', JSON.stringify(this.json));
            }
        }

        @Watch('edit')
        private editComment() {
            if (this.edit !== null) {
                this.editor.setContent(JSON.parse(this.edit.description));
                this.editor.focus();
            }
        }

        private submitComment() {
            if (this.edit !== null) {
                this.$emit('update-comment', {
                    id: this.edit.id,
                    description: JSON.stringify(this.json),
                });
            } else {
                this.$emit('add-comment', JSON.stringify(this.json));
            }

            this.editor.clearContent();
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
                    new Placeholder({
                        emptyNodeClass: 'is-empty',
                        emptyNodeText: this.placeholder,
                        showOnlyWhenEditable: true,
                    }),
                ],
                onUpdate: ({ getJSON }: any) => {
                    this.$emit('input');
                    this.json = getJSON();
                },
                onFocus: () => {
                    this.editorFocus = true;
                },
                onBlur: () => {
                    this.editorFocus = false;
                },
            });

            if (this.task) {
                this.setJson();
            }
        }

        private beforeDestroy() {
            this.editor.destroy();
        }
    }
</script>

<style lang="scss" src="./TextEditor.scss">
</style>
