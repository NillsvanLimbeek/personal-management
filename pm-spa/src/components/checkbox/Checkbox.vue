<template>
    <div
        class="checkbox"
        :class="{ 'checkbox--active': active }"
        @click="$emit('click')"
    />
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    @Component({})
    export default class Checkbox extends Vue {
        @Prop() private active!: boolean;
    }
</script>

<style lang="scss">
    @import './Checkbox';
</style>
