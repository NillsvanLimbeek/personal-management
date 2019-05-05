<template>
    <div class="task">
        <div
            :class="{ 'task__checkbox--active': task.completed }"
            class="task__checkbox"
            @click="updateTask(task.completed)"
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

        private updateTask(msg: boolean): void {
            this.task.completed = msg === true ? false : true;

            this.$emit('update-task', {
                id: this.task.id,
                completed: this.task.completed,
            });
        }
    }
</script>
