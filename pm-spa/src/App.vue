<template>
    <div id="app">
        <BaseLayout />
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    import BaseLayout from './components/BaseLayout.vue';

    @Component({
        components: {
            BaseLayout,
        },
    })
    export default class App extends Vue {}
</script>

<style lang="scss">
    @import 'assets/scss/main';
</style>
