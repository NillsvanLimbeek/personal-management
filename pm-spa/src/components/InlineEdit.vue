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
                class="input"
                ref="input"
                type="text"
                v-model="internalValue"
            >
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    @Component({})
    export default class InlineEdit extends Vue {
        @Prop({ required: true }) private title!: string;

        private showEdit: boolean = false;

        private internalValue = this.title;

        private focus() {
            this.showEdit = true;

            Vue.nextTick(() => {
                (this.$refs.input as HTMLInputElement).select();
            });
        }

        private submit() {
            this.showEdit = false;
            this.$emit('update-title', this.internalValue);
        }
    }
</script>
