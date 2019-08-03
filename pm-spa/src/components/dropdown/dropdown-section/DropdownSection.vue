<template>
    <div
        class="dropdown-section"
        :class="{ 'dropdown-section--last': lastSection }"
    >

        <slot />
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    @Component({})
    export default class DropdownSection extends Vue {
        @Prop() private lastSection!: boolean;
    }
</script>

<style lang="scss" src="./DropdownSection.scss">
</style>
