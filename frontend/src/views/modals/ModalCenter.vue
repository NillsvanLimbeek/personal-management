<template>
    <div class="modal-center">
        <div
            class="modal-center__background"
            @click.self="$router.go(-1)"
        ></div>

        <div
            class="modal-center__body"
            :class="{ 'modal-center__body--height': modalType }"
        >
            <i
                @click="$router.go(-1)"
                class="modal-center__close fas fa-times"
            />

            <component
                :is="modalContent"
                :date="date"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';
    import { parse, parseISO, format } from 'date-fns';

    @Component({})
    export default class ModalCenter extends Vue {
        private date: Date | undefined;

        private get modalContent() {
            switch (this.$route.name) {
                case 'calendarTaskModal':
                case 'homeTaskModal':
                    return () => import('./content/TaskModal.vue');
                case 'calendarCreateTaskModal':
                    return () => import('./content/CreateTaskModal.vue');
            }
        }

        private get modalType() {
            switch (this.$route.name) {
                case 'calendarTaskModal':
                case 'homeTaskModal':
                    return true;
                default:
                    return false;
            }
        }

        private created() {
            this.date = new Date(this.$attrs.date);
        }
    }
</script>

<style lang="scss" src="./ModalCenter.scss">
</style>
