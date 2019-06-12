<template>
    <div class="modals-container">
        <div class="modals-container__header">
            <div class="modals-container__complete">
                <div
                    :class="{ 'task__checkbox--active': getTask.completed }"
                    class="task__checkbox"
                    @click="updateTask(getTask.completed)"
                />

                Task {{ getTask.completed ? 'Complete' : 'Not complete' }}
            </div>

            <i
                @click="$router.go(-1)"
                class="modals-container__close fas fa-times"
            />
        </div>

        <div class="modals-container__body">
            <div class="modals-container__title">
                {{ getTask.title }}
            </div>

            <div class="modals-container__assigned-to">
                <i class="far fa-user"></i>
            </div>

            <div class="modals-container__due-date">
                <i class="far fa-calendar-alt"></i>
            </div>

            <div class="modals-container__description"></div>

            <div class="modals-container__comments"></div>
        </div>

        <div class="modals-container__footer"></div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Getter } from '@/vue-script';

    import { ITask } from '@data/models';

    @Component({})
    export default class ModalsContainer extends Vue {
        @Getter('tasks/getTasks') private tasks!: ITask[];

        private get getTask(): ITask | undefined {
            return this.tasks.find((x) => x.id === this.$route.params.id);
        }

        private updateTask(msg: boolean): void {
            if (this.getTask) {
                this.getTask.completed = msg === true ? false : true;
                this.$store.dispatch('tasks/updateTask', this.getTask.completed);
            }
        }
    }
</script>
