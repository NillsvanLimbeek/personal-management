<template>
    <div class="main-navigation">
        <div class="main-navigation__logo">
            Project
            <span class="title-bold">Management</span>
        </div>

        <div class="main-navigation__links">
            <router-link
                :to="{ name: 'home' }"
                class="main-navigation__link"
            >
                <i class="fas fa-home" />
                Home
            </router-link>

            <router-link
                :to="{ name: 'tasks' }"
                class="main-navigation__link"
            >
                <i class="far fa-check-circle" />
                Tasks
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    @Component({})
    export default class MainNavigation extends Vue {}
</script>

<style lang="scss" src="./MainNavigation.scss">
</style>
