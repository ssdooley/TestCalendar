import { DatePipe } from '@angular/common';

export class DateModel {
    today = Date.now();
    todayDate = new Date(Date.now());
    monthDate = this.todayDate.getMonth();
    yearDate = this.todayDate.getFullYear();

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
}