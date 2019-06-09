<template>
    <div id="app">
        <BaseLayout/>
        <ModalsContainer/>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    import BaseLayout from './components/BaseLayout.vue';
    import ModalsContainer from './views/modals/ModalsContainer.vue';

    @Component({
        components: {
            BaseLayout,
            ModalsContainer,
        },
    })
    export default class App extends Vue {}
</script>

<style lang="scss">
    @import 'assets/scss/main';
</style>
