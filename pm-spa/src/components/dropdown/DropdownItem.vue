<template>
    <div
        class="dropdown-item"
        @click="$emit('click')"
    >
        {{ title }}
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from '@/vue-script';

    @Component({})
    export default class DropdownItem extends Vue {
        @Prop({ required: true }) private title!: string;
    }
</script>
