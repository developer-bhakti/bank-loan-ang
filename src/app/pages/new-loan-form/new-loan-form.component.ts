import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { min } from 'rxjs';

@Component({
  selector: 'app-new-loan-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-loan-form.component.html',
  styleUrl: './new-loan-form.component.css'
})
export class NewLoanFormComponent {

  loanAppForm: FormGroup = new FormGroup({});

  formBuilder = inject(FormBuilder);

  constructor() {
    this. initializeForm();
  }

  initializeForm(){
    this.loanAppForm = this.formBuilder.group({
      applicationId:[0],
      fullName:[''],
      applicationStatus: [''],
      panCard: [''],
      dateOfBirth: ['',],
      email: [''],
      phone: [''],
      address: ['',],
      city: ['',],
      state: ['',],
      zipCode: [''],
      annualIncome: [0],
      employmentStatus: [''],
      creditScore: [0],
      assets:  [''],
      dateApplied: [''],
      loans: this.formBuilder.array([this.createLoanGroup()]),
      customerId: [0],
    })
  }

  createLoanGroup(): FormGroup {
    return this.formBuilder.group({
      loanID: [0],
      applicantID: [0],
      bankName: [''],
      loanAmount: [0],
      emi:[0],
    })
  }

  get loanList() : FormArray {
    return this.loanAppForm.get('loans') as FormArray;
  }

  addNewLoan() {
    this.loanList.push(this.createLoanGroup())
  }

  removeLoan(index: number) {
    debugger;
    this.loanList.removeAt(index)
  }

  onSave() {
    
  }

}
