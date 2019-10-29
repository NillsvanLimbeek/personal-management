<template>
    <div class="base-input">
        <label for="input">{{ label }}</label>
        <input type="text" v-on="$listeners" v-bind="$attrs" name="input">
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    @Component({
        inheritAttrs: false,
    })
    export default class BaseInput extends Vue {
        @Prop() private label!: string;
    }
</script>

<style lang="scss" src="./BaseInput.scss">
</style>
