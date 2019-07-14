<template>
    <div class="modal-right">
        <i
            @click="$router.go(-1)"
            class="modal-right__close fas fa-times"
        />

        <component :is="modalContent"></component>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    @Component({})
    export default class ModalRight extends Vue {
        private get modalContent() {
            switch (this.$route.name) {
                case 'listTaskModal':
                    return () => import('./content/TaskModal.vue');
            }
        }
    }
</script>

<style lang="scss">
    @import 'modal-right.scss';
</style>
