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

            {{ date }}
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from '@/vue-script';

    import { toDate } from 'date-fns';

    @Component({})
    export default class ModalCenter extends Vue {
        private date: Date | undefined;

        private created() {
            this.date = new Date(this.$attrs.date);
        }
    }
</script>
