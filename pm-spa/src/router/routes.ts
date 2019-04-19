import { RouteConfig } from 'vue-router';

export const routes: RouteConfig[] = [
    {
        path: '/',
        redirect: { name: 'home' },
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/tasks',
        redirect: '/tasks/list',
        name: 'tasks',
        component: () => import('@/views/Tasks.vue'),
        children: [
            {
                path: 'list',
                name: 'taskList',
                component: () => import('@views/tasks/List.vue'),
            },
            {
                path: 'calendar',
                name: 'taskCalendar',
                component: () => import('@views/tasks/Calendar.vue'),
            },
            {
                path: 'files',
                name: 'taskFiles',
                component: () => import('@views/tasks/Files.vue'),
            },
        ],
    },
];
