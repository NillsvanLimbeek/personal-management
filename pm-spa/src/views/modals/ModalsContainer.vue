<template>
    <div
        class="modals-container"
        :class="{ 'modals-container--closed': !isOpen }">

        <i
            @click="$store.dispatch('modals/toggleModal', false)"
            class="modals-container__close fas fa-times"/>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Getter } from '@/vue-script';

    @Component({})
    export default class ModalsContainer extends Vue {
        @Getter('modals/getOpen') private isOpen!: boolean;
    }
</script>
