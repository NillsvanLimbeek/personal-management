<template>
    <div class="inline-edit">
        <div
            @click="focus"
            class="inline-edit__title"
            v-if="!showEdit"
        >
            {{ title }}
            <i class="fas fa-pen"></i>
        </div>

        <div
            class="inline-edit__input"
            v-show="showEdit"
        >
            <input
                @blur="submit"
                @keypress.enter="submit"
                class="input"
                ref="input"
                type="text"
                v-model="internalValue"
            >
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from '@/vue-script';

    @Component({})
    export default class InlineEdit extends Vue {
        @Prop({ required: true }) private title!: string;
        @Prop() private triggerEdit!: boolean;

        private showEdit: boolean = false;
        private internalValue = this.title;

        @Watch('triggerEdit')
        private renameTitle(value: boolean) {
            if (value) {
                this.focus();
            }
        }

        private focus() {
            this.showEdit = true;

            Vue.nextTick(() => {
                const input = this.$refs.input as HTMLInputElement;

                input.focus();
                input.setSelectionRange(
                    this.internalValue.length,
                    this.internalValue.length,
                );
            });
        }

        private submit() {
            this.showEdit = false;
            this.$emit('update-title', this.internalValue);
        }
    }
</script>

<style lang="scss" src="./InlineEdit.scss">
</style>
