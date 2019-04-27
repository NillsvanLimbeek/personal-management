<template>
    <div class="main-header">
        <HomeHeader v-if="$route.matched[0].path === '/home'"/>

        <TaskHeader
            :current-tab="$route.matched[1].path"
            @calendar="$router.push({ path: '/tasks/calendar' })"
            @files="$router.push({ path: '/tasks/files' })"
            @list="$router.push({ path: '/tasks/list' })"
            v-if="$route.matched[0].path === '/tasks'"
        />
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Getter } from '@/vue-script';

    import { TaskTab } from '@data/type';
    import { ITaskState } from '@data/state';

    const TaskHeader = () => import('@/components/headers/TaskHeader.vue');
    const HomeHeader = () => import('@/components/headers/HomeHeader.vue');

    @Component({
        components: {
            TaskHeader,
            HomeHeader,
        },
    })
    export default class MainHeader extends Vue {
        @Getter('tasks/getCurrentTab') private currentTab!: TaskTab;
    }
</script>