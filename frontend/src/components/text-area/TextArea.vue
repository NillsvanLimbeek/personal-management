<template>
    <textarea
        rows="1"
        placeholder="Task title"
        @input="autoResize"
        @blur="$emit('title', title)"
        v-model="internalTitle"
        class="text-area"
    />
    </template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    @Component({})
    export default class TextArea extends Vue {
        @Prop() private title!: string;

        private value: string = this.title;

        private get internalTitle() {
            return this.value;
        }

        private set internalTitle(value: string) {
            this.$emit('input', value);
        }

        private autoResize(): void {
            const textarea = document.querySelector('textarea');

            if (textarea) {
                const offset = textarea.offsetHeight - textarea.clientHeight;

                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + offset + 'px';
            }
        }
    }
</script>

<style lang="scss" src="./TextArea.scss">
</style>
