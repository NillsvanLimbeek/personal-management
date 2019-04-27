<template>
    <div class="task-list">
        <li
            :key="index"
            class="task-list__item"
            v-for="(task, index) in tasks"
        >{{ task.title }}</li>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    import { ITask } from '@models/index';

    @Component({})
    export default class TaskList extends Vue {
        @Prop({ required: true }) private tasks!: ITask[];
    }
</script>
