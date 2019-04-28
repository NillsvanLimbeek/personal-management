<template>
    <div class="task-section">
        <div class="task-section__header">
            <i
                :class="{'task-section__arrow--closed': showSection}"
                @click="showSection = !showSection"
                class="task-section__arrow fas fa-chevron-right"
            />

            <input
                :placeholder="taskSection.title"
                @blur="$emit('section-title', sectionTitle)"
                class="task-section__title"
                type="text"
                v-model="sectionTitle"
            >
        </div>

        <Task
            :key="task.id"
            :task="task"
            v-for="task in getTasks"
            v-if="showSection"
        />
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    import { ITaskSection, ITask } from '@models/index';

    const Task = () => import('@components/tasks/Task.vue');

    @Component({
        components: {
            Task,
        },
    })
    export default class TaskSection extends Vue {
        @Prop({ required: true }) private taskSection!: ITaskSection;
        @Prop({ required: true }) private tasks!: ITask[];

        private showSection: boolean = true;
        private sectionTitle: string = '';

        private get getTasks() {
            return this.tasks.filter((task) => {
                return task.taskSectionId === this.taskSection.id;
            });
        }
    }
</script>
