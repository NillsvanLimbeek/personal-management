<template>
    <div
        class="dropdown-item"
        :class="{ 'dropdown-item--disabled': disabled}"
        @click="emitClick"
    >
        {{ title }}
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    import { EventBus } from '@/event-bus';

    @Component({})
    export default class DropdownItem extends Vue {
        @Prop({ required: true }) private title!: string;
        @Prop() private disabled!: boolean;

        private emitClick() {
            if (!this.disabled) {
                this.$emit('click');
                EventBus.$emit('close-dropdown');
            }
        }
    }
</script>
