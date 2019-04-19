<template>
    <div class="base-layout">
        <div
            class="base-layout__navigation"
            :class="{ 'base-layout__navigation--hidden': !hideNav }">

            <i
                class="base-layout__arrow base-layout__arrow--left fas fa-chevron-left"
                @click="hideNav = false" />

            <MainNavigation />
        </div>


        <div class="base-layout__main">
            <!-- Header -->
            <div class="base-layout__header">
                <i
                    class="base-layout__arrow fas base-layout__arrow--right fa-chevron-right"
                    @click="hideNav = true" />

                <div
                    class="base-layout__header-container"
                    :class="{ 'base-layout__header-container--transform': hideNav }">

                    <MainHeader />
                </div>
            </div>

            <div
                class="base-layout__main-container"
                :class="{ 'base-layout__main-container--transform': hideNav }">

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
