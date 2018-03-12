import { ScheduleEvent } from './schedule.event';

export class CalendarDay {
    events: ScheduleEvent[];
    get hasEvents(): boolean { return this.events && this.events.length > 0; }
    date: number;

    constructor() {
        this.events = new Array<ScheduleEvent>();
    }
}