import { DatePipe } from '@angular/common';

export class DateModel {
    today = Date.now();
    todayDate = new Date(Date.now());
    monthDate = this.todayDate.getMonth();
    yearDate = this.todayDate.getFullYear();
    selectedDate = '2018-3-21'

    dateArray = [
        '2018-5-01'
        ]

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
    
    todayMonth = this.month[this.monthDate];

    daysOfMonth = new Date(this.yearDate, this.monthDate + 1, 0).getDate();

    
    updatedSelectedDate: Date = new Date(this.selectedDate);
    selectedMonth = this.updatedSelectedDate.getMonth();
    selectedYear = this.updatedSelectedDate.getFullYear();

    daysInSelectedMonth = new Date(this.selectedMonth, this.selectedYear + 1, 0).getDate();
    mmmSelectedMonth = this.month[this.selectedMonth];

    daysOfSelectedMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();


    updatedDateArray: Date = new Date(this.dateArray[0]);
    updatedMonth = this.updatedDateArray.getMonth();
    updatedYear = this.updatedDateArray.getFullYear();

    daysInSelectedArray = new Date(this.updatedMonth, this.updatedYear + 1, 0).getDate();
    mmmUpdatedMonth = this.month[this.updatedMonth];


}