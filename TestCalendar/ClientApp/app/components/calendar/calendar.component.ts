import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateService } from '../../services/date.service';
import { DateModel } from '../../models/dates';


@Component({
    selector: 'calendar',
    templateUrl: 'calendar.component.html',
    styleUrls: ['calendar.component.css']
})
export class CalendarComponent {
    month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    weekDay = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]
    dateinfo = new DateModel();
    today = Date.now();
    todayDate = new Date(Date.now());
    monthDate = this.todayDate.getMonth();
    currentMonth = this.todayDate.getMonth();
    todayMonth = this.month[this.currentMonth];
    todayYear = this.todayDate.getFullYear();
    yearDate = this.todayDate.getFullYear();
    dayDate = this.todayDate.getDay();
    chosenDate = this.yearDate + '-' + this.monthDate + '-' + this.dayDate;
    selectedDate: string;
    parseDate: number;
    updatedSelectedDate: any;
    selectedMonth: any;
    selectedYear: any;
    daysOfSelectedMonth: any;
    mmmSelectedMonth: any;
    mmmSelectedDay: any;
    dayOfWeek: any;
    dataDate: any;
    mmmDayofFirstMonth: any;
    
    constructor(public dateService: DateService) { }

    
    

    public addEvent(type: string, event:
        MatDatepickerInputEvent<Date>) {
        this.selectedDate = `${event.value}`.toString();
        this.updatedSelectedDate = new Date(this.selectedDate);
        this.parseDate = Date.parse(this.selectedDate);
        this.selectedMonth = this.updatedSelectedDate.getMonth();
        this.selectedYear = this.updatedSelectedDate.getFullYear();
        this.daysOfSelectedMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
        this.mmmSelectedMonth = this.month[this.selectedMonth];
        this.todayMonth = this.mmmSelectedMonth;
        this.todayYear = this.selectedYear;
        this.checkMonth(this.selectedDate);
    }

    checkMonth(data:any) {
        this.dataDate = new Date(data);
        this.dayOfWeek = this.dataDate.getDay();
        this.mmmSelectedDay = this.weekDay[this.dayOfWeek];
        let dateNum: number = this.dataDate.getDate();
        let firstOfMonth: any = this.dataDate.getDate() - dateNum + 1;
        let calMonth: number = this.dataDate.getMonth() + 1;
        let monthBegin: string = calMonth + "/" + "1" + "/" + this.dataDate.getFullYear();
        let firstMonth = new Date(monthBegin);
        let dayofFirstMonth = firstMonth.getDay();
        this.mmmDayofFirstMonth = this.weekDay[firstMonth.getDay()];
        console.log("Week Day of First of the month" + " " + this.mmmDayofFirstMonth);
        this.populateCalendar(this.mmmDayofFirstMonth);
    }

    populateCalendar(data: any) {
        console.log("Repeat Week Day of First of the month" + " " + data);
        if (data == "Thursday") {
            this.thursday(data);
        }
    }

    thursday(data: any) {
        let mm4 = 1
        let mm5 = 2
        let mm6 = 3
        let mm7 = 4
        let mm8 = 5
    }
}