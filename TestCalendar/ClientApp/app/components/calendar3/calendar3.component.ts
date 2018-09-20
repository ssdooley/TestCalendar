import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

import { ScheduleEvent } from '../../models/schedule.event';
import { CalendarDay } from '../../models/calendar.day';
import { CalendarMonth } from '../../models/calendar.month';

export interface CalendarDate {
    mDate: moment.Moment;
    selected?: boolean;
    today?: boolean;
    triptest?: boolean;
}


@Component({
    selector: 'calendar3',
    templateUrl: './calendar3.component.html',
    styleUrls: ['./calendar3.component.css']
})

export class Calendar3Component implements OnInit, OnChanges {
    momDate: moment.Moment;

    currentDate = moment();
    dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    weeks: CalendarDate[][] = [];
    sortedDates: CalendarDate[] = [];
    events: ScheduleEvent[];
    currentEvents: ScheduleEvent[];
    singleEvent: any = new Array<ScheduleEvent>();
    


    @Input() selectedDates: CalendarDate[] = [];
    @Output() onSelectDate = new EventEmitter<CalendarDate>();

    constructor() {
        this.events = [
            { startDate: '20180301', endDate: '20180318', loc: 'KLAX', poc: 'Ralph' },
            { startDate: '20180316', endDate: '20180325', loc: 'KLOV', poc: 'Sam' },
            { startDate: '20180324', endDate: '20180405', loc: 'KDAL', poc: 'Bill' },
            { startDate: '20180321', endDate: '20180322', loc: 'KLOV', poc: 'New Guy' },
            { startDate: '20180421', endDate: '20180423', loc: 'KDAL', poc: 'Ralph' },
            { startDate: '20180425', endDate: '20180428', loc: 'KDEN', poc: 'Sam' },
            { startDate: '20190321', endDate: '20190323', loc: 'KSEA', poc: 'Bill' }
        ]
    }

    ngOnInit(): void {
        this.generateCalendar();
        this.filterTrips(this.momDate);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.selectedDates &&
            changes.selectedDates.currentValue &&
            changes.selectedDates.currentValue.length > 1) {
            // sort on date changes for better performance when range checking
            this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
            this.generateCalendar();
            this.filterTrips(this.momDate);
        }
    }

    isToday(date: moment.Moment): boolean {
        return moment().isSame(moment(date), 'day');
    }

    isSelected(date: moment.Moment): boolean {
        return _.findIndex(this.selectedDates, (selectedDate: any) => {
            return moment(date).isSame(selectedDate.mDate, 'day');
        }) > -1;
    }    

    isSelectedMonth(date: moment.Moment): boolean {
        return moment(date).isSame(this.currentDate, 'month');
    }

    selectDate(date: CalendarDate): void {
        this.onSelectDate.emit(date);
    }

    prevMonth(): void {
        this.currentDate = moment(this.currentDate).subtract(1, 'months');
        this.generateCalendar();
        this.filterTrips(this.currentDate);
    }

    nextMonth(): void {
        this.currentDate = moment(this.currentDate).add(1, 'months');
        this.generateCalendar();
        this.filterTrips(this.currentDate);
    }

    firstMonth(): void {
        this.currentDate = moment(this.currentDate).startOf('year');
        this.generateCalendar();
        this.filterTrips(this.currentDate);
    }

    lastMonth(): void {
        this.currentDate = moment(this.currentDate).endOf('year');
        this.generateCalendar();
        this.filterTrips(this.currentDate);
    }

    prevYear(): void {
        this.currentDate = moment(this.currentDate).subtract(1, 'year');
        this.generateCalendar();
        this.filterTrips(this.currentDate);
    }

    nextYear(): void {
        this.currentDate = moment(this.currentDate).add(1, 'year');
        this.generateCalendar();
        this.filterTrips(this.currentDate);
    }
    //*************TEST BEGIN**************************

    test(data: ScheduleEvent) {
        data.startDate = moment(data.startDate).subtract(1, 'day');
        data.endDate = moment(data.endDate).add(1, 'day');
        console.log(`from test(): ${data}`);
    }
    filterTrips(date: moment.Moment) {        
        this.currentEvents = this.events.filter(function (el) {
            return moment(el.startDate).isSame(moment(date), 'month') || moment(el.endDate).isSame(moment(date), 'month')
        });
        
        this.currentEvents.forEach((e: ScheduleEvent) => {
            this.test(e);
        });
    }    

    tripDateTest(date: moment.Moment, data: ScheduleEvent): boolean {
        return moment(date).isBetween(data.startDate, data.endDate);
    }


    

    //*************TEST END***************************

    generateCalendar(): void {
        const dates = this.fillDates(this.currentDate);
        const weeks: CalendarDate[][] = [];
        while (dates.length > 0) {
            weeks.push(dates.splice(0, 7));
        }
        this.weeks = weeks;
    }

   fillDates(currentMoment: moment.Moment): CalendarDate[] {
        const firstOfMonth = moment(currentMoment).startOf('month').day();
        const less = currentMoment.diff(firstOfMonth, 'days');
        const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
        const start = firstDayOfGrid.date();
        return _.range(start, start + 42)
            .map((date: number): CalendarDate => {
                const d = moment(firstDayOfGrid).date(date);
                const e = this.events;                
                return {
                    today: this.isToday(d),
                    selected: this.isSelected(d),
                    mDate: d,
                };
            });
    }
}
