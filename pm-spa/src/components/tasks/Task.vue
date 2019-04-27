<template>
    <div class="task">
        <div
            :class="{'task__checkbox--active': checkbox}"
            @click="checkbox = !checkbox"
            class="task__checkbox"
        />
        {{ task.title }}
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    import { ITask } from '@/data/models';

    @Component({})
    export default class Task extends Vue {
        @Prop({ required: true }) private task!: ITask;

        private checkbox: boolean = false;
    }
</script>
