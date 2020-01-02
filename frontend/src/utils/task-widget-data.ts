import { ITasksWidgetData, IProgressRingData, ITask } from '@/data/models';
import { isBefore } from 'date-fns';

function taskWidgetData(
    title: 'Completed Tasks' | 'Overdue Tasks',
    stroke: string,
    tasks: ITask[],
): ITasksWidgetData {
    return {
        title,
        stroke,
        tasks,
        progressRing:
            title === 'Completed Tasks'
                ? totalTasks(tasks)
                : overdueTasks(tasks),
    };
}

function totalTasks(tasks: ITask[]): IProgressRingData {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed === true)
        .length;
    const percent = (completedTasks / totalTasks) * 100;

    return { totalTasks, completedTasks, percent };
}

function overdueTasks(tasks: ITask[]): IProgressRingData {
    const totalTasks = tasks.filter((task) => task.dueDate).length;
    const tasksOverdue = tasks.filter((task) => {
        if (task.dueDate) {
            return !task.completed && isBefore(task.dueDate, Date.now());
        }
    });

    const percent = (tasksOverdue.length / tasks.length) * 100;

    return {
        totalTasks,
        completedTasks: tasksOverdue.length,
        percent,
    };
}

export { taskWidgetData };
