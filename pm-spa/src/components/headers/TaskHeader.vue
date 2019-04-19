<template>
    <div class="task-header">
        <p class="header-primary">
            Your<span class="title-bold">Tasks</span>
        </p>

        <div class="task-header__list">
            <p
                class="task-header__link"
                :class="{'task-header__link--active': currentTab === '/tasks/list'}"
                @click="$emit('list')">

                List
            </p>

            <p
                class="task-header__link"
                :class="{'task-header__link--active': currentTab === '/tasks/calendar'}"
                @click="$emit('calendar')">

                Calendar
            </p>

            <p class="task-header__link"
                :class="{'task-header__link--active': currentTab === '/tasks/files'}"
                @click="$emit('files')">

                Files
            </p>
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
