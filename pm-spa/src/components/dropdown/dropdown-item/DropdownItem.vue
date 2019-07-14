<template>
    <div
        class="dropdown-item"
        :class="{ 'dropdown-item--disabled': disabled}"
        @click="emitClick"
        @mouseenter="showSecondMenu = true"
        @mouseleave="showSecondMenu = false"
    >

        <p class="dropdown-item__title">
            {{ title }}
        </p>

        <i
            v-if="secondMenu"
            class="fas fa-chevron-right"
        />

        <div
            v-if="showSecondMenu"
            class="dropdown-item__second-menu"
        >
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    import { EventBus } from '@/event-bus';

    @Component({})
    export default class DropdownItem extends Vue {
        @Prop({ required: true }) private title!: string;
        @Prop() private disabled!: boolean;
        @Prop() private secondMenu!: boolean;

        private showSecondMenu: boolean = false;

        private emitClick(): void {
            if (!this.disabled) {
                this.$emit('click');
                EventBus.$emit('close-dropdown');
            }
        }
    }
</script>

<style lang="scss">
    @import 'dropdown-item.scss';
</style>
