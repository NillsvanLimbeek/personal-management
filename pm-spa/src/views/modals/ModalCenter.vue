<template>
    <div class="modal-center">
        <div
            class="modal-center__background"
            @click.self="$router.go(-1)"
        ></div>

        <div class="modal-center__body">
            <i
                @click="$router.go(-1)"
                class="modal-center__close fas fa-times"
            />

            <component :is="modalContent" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    @Component({})
    export default class ModalCenter extends Vue {
        private date: Date | undefined;

        private get modalContent() {
            switch (this.$route.name) {
                case 'calendarTaskModal':
                    return () => import('./content/TaskModal.vue');
                case 'calendarCreateTaskModal':
                    return () => import('./content/CreateTaskModal.vue');
            }
        }

        private created() {
            this.date = new Date(this.$attrs.date);
        }
    }
</script>
