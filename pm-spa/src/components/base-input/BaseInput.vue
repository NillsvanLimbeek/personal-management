<template>
    <div class="base-input">
        <label v-if="label" for="input">{{ label }}</label>
        <input
            type="text"
            :value="value"
            @input="updateValue"
            v-on="listeners"
            v-bind="$attrs"
        >
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    @Component({
        inheritAttrs: false,
    })
    export default class BaseInput extends Vue {
        @Prop() private label!: string;
        @Prop() private value!: string;

        private get listeners() {
            return {
                ...this.$listeners,
                input: this.updateValue,
            };
        }

        private updateValue(event: any) {
            this.$emit('input', event.target.value);
        }
    }
</script>

<style lang="scss" src="./BaseInput.scss">
</style>
