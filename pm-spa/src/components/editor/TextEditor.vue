<template>
    <div class="text-editor">
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
                    :class="{ 'is-active': isActive.bold() }"
                />

                <i
                    @click="commands.italic"
                    class="text-editor__icon fas fa-italic"
                    :class="{ 'is-active': isActive.italic() }"
                />

                <i
                    @click="commands.underline"
                    class="text-editor__icon fas fa-underline"
                    :class="{ 'is-active': isActive.underline() }"
                />

                <i
                    @click="commands.strike"
                    class="text-editor__icon fas fa-strikethrough"
                    :class="{ 'is-active': isActive.strike() }"
                />

                <i
                    @click="commands.ordered_list"
                    class="text-editor__icon fas fa-list-ol"
                    :class="{ 'is-active': isActive.ordered_list() }"
                />

                <i
                    @click="commands.bullet_list"
                    class="text-editor__icon fas fa-list-ul"
                    :class="{ 'is-active': isActive.bullet_list() }"
                />
            </div>
        </EditorMenuBar>

        <EditorContent
            :editor="editor"
            class="text-editor__editor"
        />
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

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
        // @ts-ignore
    } from 'tiptap-extensions';

    @Component({
        components: {
            EditorMenuBar,
            EditorContent,
        },
    })
    export default class TextEditor extends Vue {
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
                content: '<p>This is just a boring paragraph</p>',
            });
        }

        private beforeDestroy() {
            this.editor.destroy();
        }
    }
</script>
