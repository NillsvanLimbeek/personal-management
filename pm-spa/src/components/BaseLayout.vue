<template>
    <div class="base-layout">
        <div
            :class="{ 'base-layout__navigation--hidden': !hideNav }"
            class="base-layout__navigation"
        >
            <i
                @click="hideNav = false"
                class="base-layout__arrow base-layout__arrow--left fas fa-chevron-left"
            />

            <MainNavigation />
        </div>

        <div class="base-layout__main">
            <!-- Header -->
            <div class="base-layout__header">
                <i
                    @click="hideNav = true"
                    class="base-layout__arrow fas base-layout__arrow--right fa-chevron-right"
                />

                <div
                    :class="{
                        'base-layout__header-container--transform': hideNav,
                    }"
                    class="base-layout__header-container"
                >
                    <MainHeader />
                </div>
            </div>

            <div
                :class="{ 'base-layout__main-container--transform': hideNav }"
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
        private hideNav: boolean = true;
    }
</script>
