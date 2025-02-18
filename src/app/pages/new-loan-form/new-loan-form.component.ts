import { MasterService } from './../../services/master.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAPIResponse } from '../../model/loan';

@Component({
  selector: 'app-new-loan-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ Add CommonModule
  templateUrl: './new-loan-form.component.html',
  styleUrls: ['./new-loan-form.component.css']
})
export class NewLoanFormComponent implements OnInit {
  loanAppForm: FormGroup = new FormGroup({});
  formBuilder = inject(FormBuilder);
  MasterSrv = inject(MasterService);

  constructor() {}

  ngOnInit() {
    this.initializeForm(); // ✅ Initialize form in ngOnInit()

    if (this.MasterSrv.loggedUserData) {
      this.loanAppForm.controls['customerId'].setValue(this.MasterSrv.loggedUserData.userId); // ✅ Fixed typo from 'cstomerId' to 'customerId'
    }
  }

  initializeForm() {
    this.loanAppForm = this.formBuilder.group({
      applicationId: [0],
      fullName: [''],
      applicationStatus: [''],
      panCard: [''],
      dateOfBirth: [''],
      email: [''],
      phone: [''],
      address: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      annualIncome: [0],
      employmentStatus: [''],
      creditScore: [0],
      assets: [''],
      dateApplied: [new Date()],
      loans: this.formBuilder.array([this.createLoanGroup()]),
      customerId: [0], // ✅ Corrected field name
    });
  }

  createLoanGroup(): FormGroup {
    return this.formBuilder.group({
      loanID: [0],
      applicantID: [0],
      bankName: [''],
      loanAmount: [0],
      emi: [0],
    });
  }

  get loanList(): FormArray {
    return this.loanAppForm.get('loans') as FormArray;
  }

  addNewLoan() {
    this.loanList.push(this.createLoanGroup());
  }

  removeLoan(index: number) {
    this.loanList.removeAt(index);
  }

  onSave() {
    const formValue = this.loanAppForm.value;

    this.MasterSrv.onSaveLoan(formValue).subscribe((res: IAPIResponse) => {
      if (res.result) {
        alert('Loan application created successfully');
      } else {
        alert(res.message);
      }
    });
  }
}
