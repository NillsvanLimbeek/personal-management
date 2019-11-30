<template>
    <div class="home">
        <div class="column">
            <ProgressRing />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    const ProgressRing = () =>
        import('@/components/progress-ring/ProgressRing.vue');

    @Component({
        components: {
            ProgressRing,
        },
    })
    export default class Home extends Vue {}
</script>
