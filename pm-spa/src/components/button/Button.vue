<template>
    <button class="button" v-on="$listeners">
        <slot />
    </button>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    @Component({})
    export default class Button extends Vue {}
</script>

<style lang="scss" src="./Button.scss">
</style>
