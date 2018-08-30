import { Component, OnInit } from '@angular/core';
import { AbsenceService } from '../absence.service';
import { Absence } from '../absence';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, from} from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css']
})
export class AbsencesComponent implements OnInit {

  choiceForm: FormGroup;
  filterByReasonForm: FormGroup;
  absences: Absence[];
  absencesLocal: Absence[];
  choices: string[] = ['Order by Nothing','Order by Emission date','Order by Start Date'];
  reasons: string[] = ['','PaidVacation','RTT','SickChild','LeaveFamilyEvents'];
  choiceTemp: string = 'Order by Nothing';
  reasonTemp: string = '';
  count: number = 0; //To avoid an infinite loop

  constructor(private absenceService: AbsenceService, private fb: FormBuilder) { }
  
  ngOnInit() {
    this.choiceForm = this.fb.group({
      choiceControl: ['Order by Nothing']});
    this.filterByReasonForm = this.fb.group({
      filterByReasonControl: ['']});
    this.getAbsences();
  }

  onChange(choiceVal: string):void {
    this.count += 1;
    if(choiceVal == 'Order by Nothing'){
      this.choiceTemp = choiceVal;
      this.getAbsences();
    }
    else if(choiceVal == 'Order by Emission date'){
      this.choiceTemp = choiceVal;
      this.sortByEmissionDate();
    }    
    else if(choiceVal == 'Order by Start Date'){
      this.choiceTemp = choiceVal;
      this.sortByStartDate();
    }

    if(this.count < 2)
    {
      this.filterChange(this.reasonTemp);
    }
    else{
      this.count = 0;
    }

  }
  
  filterChange(reasonVal: string):void {
    this.count += 1;
    
    this.reasonTemp = reasonVal;
    if (reasonVal != '')
    {
      this.absenceService.filterByReason(reasonVal).subscribe(abs => this.absences = abs);

    }
    else
    {
      this.getAbsences();
    }

    if(this.count < 2)
    {
      this.onChange(this.choiceTemp);
    }
    else{
      this.count =0;
    }
    
  }

  getAbsences(): void {
    this.absenceService.getAbsences().subscribe(abs=> this.absences = abs);
    this.absencesLocal = this.absences;
  }

  sortByEmissionDate(): void {
    this.absenceService.sortByEmissionDate().subscribe(abs=> this.absences = abs);
  }

  sortByStartDate(): void {
    this.absenceService.sortByStartDate().subscribe(abs=> this.absences = abs);
  }

}

