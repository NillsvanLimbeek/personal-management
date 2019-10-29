<template>
    <div class="search-bar">
        <i
            v-if="!showInput"
            class="fas fa-search"
            @click="showInput = true"
        />

        <div
            class="search-bar__input"
            v-else
        >
            <BaseInput placeholder="Search..." />

            <i class="fas fa-times" @click="showInput = false"/>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    const BaseInput = () => import('@/components/base-input/BaseInput.vue');

    @Component({
        components: {
            BaseInput,
        },
    })
    export default class SearchBar extends Vue {
        private showInput: boolean = false;
    }
</script>

<style lang="scss" src="./SearchBar.scss">
</style>
