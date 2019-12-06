<template>
    <div class="search-bar">
        <div class="search-bar__input">
            <BaseInput
                placeholder="Search..."
                :value="value"
                @input="updateValue"
            />

            <i
                class="search-bar__cross fas fa-times"
                @click="clearInput"
            />
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
        private value: string | null = '';

        private updateValue(event: any) {
            this.$emit('input', event);
        }

        private clearInput() {
            this.value = null;
            this.$emit('clear');
        }
    }
</script>

<style lang="scss" src="./SearchBar.scss">
</style>
