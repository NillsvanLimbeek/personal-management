<template>
    <div>
        <Calendar :tasks="tasks" />

        <transition name="modal-center">
            <router-view />
        </transition>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Getter } from '@/vue-script';

    import { ITask } from '@/data/models';
    import { EventBus } from '@/event-bus';

    const Calendar = () => import('@components/calendar/Calendar.vue');

    @Component({
        components: {
            Calendar,
        },
    })
    export default class TaskCalendarSection extends Vue {
        @Getter('tasks/getTasks') private tasks!: ITask[];

        private openModal(id: string) {
            if (this.$route.name === 'calendarTaskModal') {
                this.$router.replace({ path: `${id}` });
            } else {
                this.$router.push({ path: `calendar/task/${id}` });
            }
        }

        private created() {
            EventBus.$on('task-modal', (id: string) => {
                this.openModal(id);
            });
        }
    }
</script>
