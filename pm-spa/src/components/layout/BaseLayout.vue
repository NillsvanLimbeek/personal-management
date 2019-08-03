<template>
    <div class="base-layout">
        <div
            :class="{ 'base-layout__navigation--hidden': !showNavigation }"
            class="base-layout__navigation"
            @mouseleave="hoverNav = false"
        >
            <i
                @click="showNav = false"
                class="base-layout__arrow base-layout__arrow--left fas fa-chevron-left"
            />

            <MainNavigation />
        </div>

        <div
            v-if="!showNav"
            class="base-layout__hover-area"
            @mouseenter="hoverNav = true"
        />

        <div class="base-layout__main">
            <!-- Header -->
            <div class="base-layout__header">
                <i
                    @click="showNav = true"
                    class="base-layout__arrow fas base-layout__arrow--right fa-chevron-right"
                />

                <div
                    :class="{
                        'base-layout__header-container--transform': showNavigation,
                    }"
                    class="base-layout__header-container"
                >
                    <MainHeader />
                </div>
            </div>

            <div
                :class="{ 'base-layout__main-container--transform': showNavigation }"
                class="base-layout__main-container"
            >
                <div class="box">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    const MainNavigation = () => import('./MainNavigation.vue');
    const MainHeader = () => import('./MainHeader.vue');

    @Component({
        components: {
            MainNavigation,
            MainHeader,
        },
    })
    export default class BaseLayout extends Vue {
        private showNav: boolean = true;
        private hoverNav: boolean = false;

        private get showNavigation() {
            if (this.showNav) {
                return true;
            }

            if (!this.showNav && this.hoverNav) {
                return true;
            }
        }
    }
</script>

<style lang="scss" src="./BaseLayout.scss">
</style>
