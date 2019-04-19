<template>
    <div class="main-navigation">
        <div class="main-navigation__logo">
            Project<span class="title-bold">Management</span>
        </div>

            <div class="main-navigation__links">
                <router-link
                    class="main-navigation__link"
                    :to="{ name: 'home' }">

                    <i class="fas fa-home"></i>
                    Home
                </router-link>

                <router-link
                    class="main-navigation__link"
                    :to="{ name: 'tasks' }">

                    <i class="far fa-check-circle"></i>
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
