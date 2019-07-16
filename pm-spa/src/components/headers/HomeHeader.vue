<template>
    <div class="task-header">
        Your
        <span class="title-bold">Home</span>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    @Component({})
    export default class HomeHeader extends Vue {}
</script>

<style lang="scss">
    @import 'TaskHeader.scss';
</style>
