<template>
    <div class="sort-button">
        <span @click="$emit('sort')">Sort</span>

        <i class="fas fa-arrows-alt-v" />

        <span @click="$emit('cancel')">Cancel</span>

        <span @click="$emit('save')">Save</span>
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
