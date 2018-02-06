import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateService } from '../../services/date.service';
import { DateModel } from '../../models/dates';


@Component({
    selector: 'calendar',
    templateUrl: 'calendar.component.html',
    styleUrls: ['calendar.component.css']
})
export class CalendarComponent {
    constructor(public dateService: DateService) { }
}