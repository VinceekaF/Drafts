import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbsencesComponent} from './absences/absences.component';
import { AbsenceRequestComponent } from './absence-request/absence-request.component'

const routes: Routes = [
  { path:'', redirectTo: '/absences', pathMatch:'full'},
  { path: 'absences', component: AbsencesComponent},
  { path: 'absence-request', component: AbsenceRequestComponent}
  
]

@NgModule({
  imports:[ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}