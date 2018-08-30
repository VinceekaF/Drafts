import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AbsenceService } from './absence.service';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AbsencesComponent } from './absences/absences.component';
import { AppRoutingModule } from './/app-routing.module';
import { AbsenceRequestComponent } from './absence-request/absence-request.component';

@NgModule({
  declarations: [
    AppComponent,
    AbsencesComponent,
    AbsenceRequestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AbsenceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
