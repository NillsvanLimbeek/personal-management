<template>
    <div
        class="sort-button"
        @click="$emit('click')"
    >
        <span>Sort</span>

        <i class="fas fa-arrows-alt-v" />
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    @Component({})
    export default class SortButton extends Vue {}
</script>

<style lang="scss">
    @import './SortButton.scss';
</style>
