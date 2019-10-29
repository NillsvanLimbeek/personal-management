<template>
    <button class="base-button" v-on="$listeners">
        <slot />
    </button>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    @Component({})
    export default class BaseButton extends Vue {}
</script>

<style lang="scss" src="./BaseButton.scss">
</style>
