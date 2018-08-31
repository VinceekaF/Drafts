import { Component, OnInit } from '@angular/core';
import { AbsenceService } from '../absence.service';
import { Absence } from '../absence';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  choices: string[] = ['Order by Emission date','Order by Start Date'];
  reasons: string[] = ['','PaidVacation','RTT','SickChild','LeaveFamilyEvents'];
  choiceTemp: string = '';
  reasonTemp: string = '';
  count: number = 0; //To avoid an infinite loop
  condition: number = 0;

  constructor(private absenceService: AbsenceService, private fb: FormBuilder) { 

  }
  
  ngOnInit() {
    this.choiceForm = this.fb.group({
      choiceControl: ['Order by Nothing']});
    this.filterByReasonForm = this.fb.group({
      filterByReasonControl: ['']});
    this.getAbsences();
  }

  onChange(choiceVal: string):void {
    this.count += 1;
    console.log('count:' + this.count);
    // if(choiceVal == 'Order by Nothing'){
    //   console.log("Order by Nothing");

    //   this.choiceTemp = choiceVal;
    //   this.getAbsences();
    // }
    // else 
    if(this.condition == 0) {
      this.condition = 1;
      if(choiceVal == 'Order by Emission date'){
        console.log("Order by Emission date");
        console.log('condition:' + this.condition);
        this.choiceTemp = choiceVal;
        this.sortByEmissionDate();
        this.absencesLocal = this.absences;
      }    
      else if(choiceVal == 'Order by Start Date'){
        console.log("Order by Start Date");
        console.log('condition:' + this.condition);
        this.choiceTemp = choiceVal;
        this.sortByStartDate();
        this.absencesLocal = this.absences;
      }
    }
    else{
      if(choiceVal == 'Order by Emission date'){
        console.log("Order by Emission date");
        console.log('condition:' + this.condition);
        this.choiceTemp = choiceVal;
        this.sortByEmissionDateLocal();
      }    
      else if(choiceVal == 'Order by Start Date'){
        console.log("Order by Start Date");
        console.log('condition:' + this.condition);
        this.choiceTemp = choiceVal;
        this.sortByStartDateLocal();
      }
    }

    if(this.count < 2)
    {
      this.filterChange(this.reasonTemp);
    }
    else{
      this.count = 0;
      console.log('count:' + this.count);
    }
  }
  
  filterChange(reasonVal: string):void {
    this.count += 1;
    console.log('count:' + this.count);
    this.reasonTemp = reasonVal;
    if(this.condition == 0)
    {
      if (reasonVal != '')
      {
        console.log('condition:' + this.condition);
        console.log('filterChange() != ""');
        this.absenceService.filterByReason(reasonVal).subscribe(abs => this.absences = abs);
      }
      else
      {
        console.log('condition:' + this.condition);
        console.log('filterChange() == ""');
        this.getAbsences();
      }

      this.absences.forEach(function (value: Absence){
        console.log("Absences: "+value.reason);
      });
      this.absencesLocal = this.absences;
      this.condition = 1;
      // this.absencesLocal.forEach(function (value: Absence){
      //   console.log("AbsencesLocal: "+value.reason);
      //   });
    }
    else{
      if (reasonVal != '')
      {
        console.log('condition:' + this.condition);
        console.log('filterChange() != ""');
        this.filterLocalByReason(reasonVal);
      }
      else
      {
        console.log('condition:' + this.condition);
        console.log('filterChange() == ""');
        this.getAbsences();
      }
    }

    if(this.count < 2)
    {
      this.onChange(this.choiceTemp);
    }
    else{
      this.count =0;
      console.log('count:' + this.count);
    }
    
  }

  getAbsences(): void {
    console.log('condition:' + this.condition);
    console.log("<<<<<<<<<<<<<<<<<<<<<<getAbsences()");
    this.absenceService.getAbsences().subscribe(abs=> this.absences = abs);
    this.condition = 0;
  }

  sortByEmissionDate(): void {
    this.absenceService.sortByEmissionDate().subscribe(abs=> this.absences = abs);
  }

  sortByStartDate(): void {
    this.absenceService.sortByStartDate().subscribe(abs=> this.absences = abs);
  }

  filterLocalByReason(reasonVal): void{
    this.absencesLocal.filter(abs => abs.reason == reasonVal);
  }

  sortByEmissionDateLocal(): void{
    this.absencesLocal.sort((a, b) => 
    new Date(b.emissionDate).getTime() - new Date(a.emissionDate).getTime());
  }

  sortByStartDateLocal(): void{
    this.absencesLocal.sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }
}

