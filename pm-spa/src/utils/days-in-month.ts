import { getDaysInMonth, startOfMonth, addDays } from 'date-fns';

export function daysInMonth(day?: Date): Date[] {
    let date: Date;

    if (day) {
        date = startOfMonth(day);
    } else {
        date = startOfMonth(new Date());
    }

    return [...Array(getDaysInMonth(date))].map((y, x) => {
        return addDays(date, x);
    });
}
