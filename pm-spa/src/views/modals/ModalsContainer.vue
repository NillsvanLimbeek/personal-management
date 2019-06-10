<template>
    <div class="modals-container">
        <div class="modals-container__header">
            {{ getTask.title }}

            <i
                @click="$router.go(-1)"
                class="modals-container__close fas fa-times"
            />
        </div>

        <div class="modals-container__body"></div>

        <div class="modals-container__footer"></div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Getter } from '@/vue-script';

    import { ITask } from '@data/models';

    @Component({})
    export default class ModalsContainer extends Vue {
        @Getter('tasks/getTasks') private tasks!: ITask[];

        private get getTask() {
            return this.tasks.find((x) => x.id === this.$route.params.id);
        }
    }
</script>
