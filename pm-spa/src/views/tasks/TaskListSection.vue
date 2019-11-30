<template>
    <div class="tasks">
        <div class="tasks__header">
            <BaseButton
                class="tasks__button"
                @click="addSection"
            >
                Add Section
            </BaseButton>

            <SearchBar
                v-model="search"
                @clear="search = null"
                @input="searchTasks"
            />
        </div>

        <div class="tasks__section">
            <Draggable
                v-model="getSections"
                v-bind="dragOptions"
                :move="onDragStart"
                @end="drag = false"
            >
                <TaskSection
                    v-for="taskSection in getSections"
                    :key="taskSections.id"
                    :task-section="taskSection"
                />
            </Draggable>
        </div>

        <transition name="modal-right">
            <router-view />
        </transition>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Getter } from '@/vue-script';

    import { ITaskState } from '@state/index';
    import { ITask, ITaskSection } from '@models/index';

    import { generateGuid } from '@/utils';

    import Draggable from 'vuedraggable';

    const BaseButton = () => import('@/components/base-button/BaseButton.vue');
    const SearchBar = () => import('@/components/search-bar/SearchBar.vue');
    const TaskSection = () => import('./components/TaskSection.vue');

    @Component({
        components: {
            Draggable,
            BaseButton,
            SearchBar,
            TaskSection,
        },
    })
    export default class TaskListSection extends Vue {
        @Getter('taskSections/getTaskSections')
        private taskSections!: ITaskSection[];
        @Getter('tasks/getTasks') private tasks!: ITask[];

        private search: string = '';
        private drag: boolean = false;

        private get dragOptions() {
            return {
                animation: 200,
                disabled: false,
                ghostClass: 'ghost',
            };
        }

        private onDragStart() {
            this.drag = true;
        }

        private get getSections(): ITaskSection[] {
            return this.taskSections;
        }

        private set getSections(sections: ITaskSection[]) {
            this.$store.dispatch('taskSections/setSectionOrder', sections);
        }

        private searchTasks(): void {
            const tasks = this.tasks
                .filter((task) => task.title.toLowerCase().includes(this.search))
                .map((task) => task.id);

            if (this.search.length > 0) {
                this.$store.dispatch('tasks/setHighlightedTasks', tasks);
            } else {
                this.$store.dispatch('tasks/setHighlightedTasks', []);
            }
        }

        private addSection(): void {
            const taskSection: ITaskSection = {
                id: generateGuid(),
                title: 'New group',
                taskIds: [],
                isOpen: true,
            };

            this.$store.dispatch('taskSections/addSection', taskSection);
        }
    }
</script>

<style lang="scss" src="./TaskListSection.scss"></style>
