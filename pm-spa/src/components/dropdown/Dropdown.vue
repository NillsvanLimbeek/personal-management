<template>
    <div class="dropdown" v-click-outside="closeDropdown">
        <!-- TODO make slot -->
        <i
            class="dropdown__button fas fa-ellipsis-v"
            @click="showDropdown = true"
        />

        <div class="dropdown__body" v-if="showDropdown">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    @Component({})
    export default class Dropdown extends Vue {
        private showDropdown: boolean = false;

        private closeDropdown(): void {
            this.showDropdown = false;
        }
    }
</script>
