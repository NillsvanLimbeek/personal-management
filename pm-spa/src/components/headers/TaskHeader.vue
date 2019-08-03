<template>
    <div class="task-header">
        <p class="header-primary">
            Your
            <span class="title-bold">Tasks</span>
        </p>

        <div class="task-header__list">
            <p
                :class="{'task-header__link--active': currentTab === '/tasks/list'}"
                @click="$emit('list')"
                class="task-header__link"
            >List</p>

            <p
                :class="{'task-header__link--active': currentTab === '/tasks/calendar'}"
                @click="$emit('calendar')"
                class="task-header__link"
            >Calendar</p>

            <p
                :class="{'task-header__link--active': currentTab === '/tasks/files'}"
                @click="$emit('files')"
                class="task-header__link"
            >Files</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    import { TaskTab } from '@/data/type';

    @Component({})
    export default class TaskHeader extends Vue {
        @Prop({ required: true }) private currentTab!: TaskTab;
    }
</script>

<style lang="scss" src="./TaskHeader.scss">
</style>