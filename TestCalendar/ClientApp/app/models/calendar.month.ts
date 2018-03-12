import { CalendarDay } from './calendar.day';

export class CalendarMonth {
    days: CalendarDay[];
    month: string;

    constructor() {
        this.days = new Array<CalendarDay>();
    }
}