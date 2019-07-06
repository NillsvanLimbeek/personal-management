import { RouteConfig } from 'vue-router';

export const routes: RouteConfig[] = [
    {
        path: '/',
        redirect: { name: 'home' },
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@views/Home.vue'),
    },
    {
        path: '/tasks',
        redirect: '/tasks/list',
        name: 'tasks',
        component: () => import('@views/Tasks.vue'),
        children: [
            {
                path: 'list',
                name: 'taskList',
                component: () => import('@views/tasks/TaskListSection.vue'),
                children: [
                    {
                        path: 'task/:id',
                        name: 'listTaskModal',
                        component: () => import('@views/modals/ModalRight.vue'),
                    },
                ],
            },
            {
                path: 'calendar',
                name: 'taskCalendar',
                component: () => import('@views/tasks/TaskCalendarSection.vue'),
                children: [
                    {
                        path: 'task/:id',
                        name: 'calendarTaskModal',
                        component: () => import('@views/modals/ModalRight.vue'),
                    },
                    {
                        path: 'create',
                        name: 'calendarCreateTaskModal',
                        component: () =>
                            import('@views/modals/ModalCenter.vue'),
                        props: true,
                    },
                ],
            },
            {
                path: 'files',
                name: 'taskFiles',
                component: () => import('@views/tasks/TaskFilesSection.vue'),
            },
        ],
    },
];
