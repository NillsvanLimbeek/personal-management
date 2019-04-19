<template>
    <div class="tasks">
        <router-view />
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    @Component({})
    export default class Tasks extends Vue { }
</script>
