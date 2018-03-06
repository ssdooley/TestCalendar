import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

export interface CalendarDate {
    mDate: moment.Moment;
    selected?: boolean;
    today?: boolean;
    trip1?: boolean;
    trip2?: boolean;
}

@Component({
    selector: 'calendar2',
    templateUrl: './calendar2.component.html',
    styleUrls: ['./calendar2.component.css']
})

export class Calendar2Component implements OnInit, OnChanges {
    currentDate = moment();
    dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    weeks: CalendarDate[][] = [];
    sortedDates: CalendarDate[] = [];

    sDate: any = '20180305';
    eDate: any = '20180318';
    loc1: any = 'KPOB';
    poc1: any = 'Dave';
    startDate = moment(this.sDate).subtract(1, 'day');
    endDate = moment(this.eDate).add(1, 'day');

    sDate2: any = '20180317';
    eDate2: any = '20180322';
    loc2: any = 'KVPS';
    poc2: any = 'Chewie';
    startDate2 = moment(this.sDate2).subtract(1, 'day');
    endDate2 = moment(this.eDate2).add(1, 'day');

    @Input() selectedDates: CalendarDate[] = [];
    @Output() onSelectDate = new EventEmitter<CalendarDate>();

    constructor() { }

    ngOnInit(): void {
        this.generateCalendar();        
        //let readableDate = moment(this.currentDate).format("MMM Do YYYY");
        //console.log('currentdate is: ' + readableDate);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.selectedDates &&
            changes.selectedDates.currentValue &&
            changes.selectedDates.currentValue.length > 1) {
            // sort on date changes for better performance when range checking
            this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
            this.generateCalendar();
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

    tripDate(date: moment.Moment): boolean {
        const midDate = (this.startDate.diff(this.endDate, 'days') / 2);
        const midPoint = moment(this.startDate).add(midDate, 'day');
        return moment(date).isBetween(this.startDate, this.endDate);        
    }

    tripDate2(date: moment.Moment): boolean {
        return moment(date).isBetween(this.startDate2, this.endDate2);
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
    }

    nextMonth(): void {
        this.currentDate = moment(this.currentDate).add(1, 'months');
        this.generateCalendar();
    }

    firstMonth(): void {
        this.currentDate = moment(this.currentDate).startOf('year');
        this.generateCalendar();
    }

    lastMonth(): void {
        this.currentDate = moment(this.currentDate).endOf('year');
        this.generateCalendar();
    }

    prevYear(): void {
        this.currentDate = moment(this.currentDate).subtract(1, 'year');
        this.generateCalendar();
    }

    nextYear(): void {
        this.currentDate = moment(this.currentDate).add(1, 'year');
        this.generateCalendar();
    }

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
        console.log('first of month is: ' + moment(firstOfMonth).format("MMM Do YYYY"));
        console.log('first day of grid is: ' + moment(firstDayOfGrid).format("MMM Do YYYY"));
        console.log('there are ' + less + ' days in between');
        this.fillTrip1(start);
        return _.range(start, start + 42)
            .map((date: number): CalendarDate => {
                const d = moment(firstDayOfGrid).date(date);
                return {
                    today: this.isToday(d),
                    selected: this.isSelected(d),
                    mDate: d,
                    trip1: this.tripDate(d),
                    trip2: this.tripDate2(d)
                };
            });        
    }

    fillTrip1(data: any) {
        
        //var a = endDate.diff(startDate, 'days');
        ////console.log('days between ' + sDate +  ' and ' + eDate + ' is ' + a);
        //return _.range(data, data + 42)
        //    .map((date: number): CalendarDate => {
        //        const d = moment(data.date()).date(date);
        //        return {
        //            trip1: this.isStartDate(d)
        //        };
        //    });
    }
}