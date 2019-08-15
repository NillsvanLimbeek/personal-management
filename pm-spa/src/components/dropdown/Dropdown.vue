<template>
    <div
        class="dropdown"
        v-click-outside="closeDropdown"
    >
        <i
            class="dropdown__button fas fa-ellipsis-v"
            @click="showDropdown = true"
        />

        <div
            class="dropdown__body"
            :class="{ 'dropdown__body--left': position === 'left' }"
            v-if="showDropdown"
        >
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    import { EventBus } from '@/event-bus';

    @Component({})
    export default class Dropdown extends Vue {
        @Prop() private position!: string;

        private showDropdown: boolean = false;

        public closeDropdown(): void {
            this.showDropdown = false;
        }

        private created() {
            EventBus.$on('close-dropdown', () => {
                this.closeDropdown();
            });
        }
    }
</script>

<style lang="scss" src="./Dropdown.scss">
</style>
