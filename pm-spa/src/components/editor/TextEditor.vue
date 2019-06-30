<template>
    <div class="text-editor">
        <EditorMenuBar
            :editor="editor"
            v-slot="{ commands, isActive }"
        >
            <div>
                <button
                    @click="commands.bold"
                    :class="{ 'is-active': isActive.bold() }"
                >
                    Bold
                </button>

                <button
                    @click="commands.italic"
                    :class="{ 'is-active': isActive.italic() }"
                >
                    Italic
                </button>

                <button
                    @click="commands.underline"
                    :class="{ 'is-active': isActive.underline() }"
                >
                    Underline
                </button>

                <button
                    @click="commands.strike"
                    :class="{ 'is-active': isActive.strike() }"
                >
                    Strike
                </button>

                <button
                    @click="commands.ordered_list"
                    :class="{ 'is-active': isActive.ordered_list() }"
                >
                    Ordered List
                </button>

                <button
                    @click="commands.bullet_list"
                    :class="{ 'is-active': isActive.bullet_list() }"
                >
                    Bullet List
                </button>
            </div>
        </EditorMenuBar>

        <EditorContent :editor="editor" />
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

<style lang="scss">
    .is-active {
        background: red;
    }
</style>
