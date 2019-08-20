<template>
    <div
        class="dropdown"
        v-click-outside="closeDropdown"
    >

        <div
            v-if="withSelection"
            class="dropdown__selection"
            @click="showDropdown = true"
        >
            <i class="dropdown__button fas fa-ellipsis-v"/>

            {{ selectedItem }}
        </div>

        <i
            v-else
            class="dropdown__button fas fa-ellipsis-v"
            @click="showDropdown = true"
        />

        <div
            class="dropdown__body"
            :class="{
                'dropdown__body--left': position === 'left',
                'dropdown__body--selection': withSelection
            }"
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
        @Prop() withSelection!: boolean;
        @Prop() private selectedItem!: string;

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
