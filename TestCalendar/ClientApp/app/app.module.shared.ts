import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppMaterialModule } from './app.module.material';

import { NoCacheRequestOptions } from './services/no-cache-request-options';
import { CoreApiService } from './services/core-api.service';
import { SidepanelService } from './services/sidepanel.service';
import { ThemeService } from './services/theme.service';
import { SnackerService } from './services/snacker.service';
import { DateService } from './services/date.service';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { SidepanelComponent } from './components/sidepanel/sidepanel.component';

import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
    declarations: [
        AppComponent,
        CalendarComponent,
        HomeComponent,
        SidepanelComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        AppMaterialModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        CoreApiService,
        DateService,
        SidepanelService,
        ThemeService,
        SnackerService,
        { provide: RequestOptions, useClass: NoCacheRequestOptions }
    ]
})
export class AppModuleShared {}
