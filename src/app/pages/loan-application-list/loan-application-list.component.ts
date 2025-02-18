import { Component, inject, NgModule } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IAPIResponse, IApplicationList } from '../../model/loan';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-loan-application-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-application-list.component.html',
  styleUrl: './loan-application-list.component.css'
})
export class LoanApplicationListComponent {

  masterSrv = inject(MasterService);
  applicationList: IApplicationList [] = []

  constructor() {
    if(this.masterSrv.loggedUserData.role == "Customer") {
     this.getCustomerApplication();
    } else {
      this.getAssignedApplications();
    }
  }

  getCustomerApplication() {
    this.masterSrv.getMyApplication(this.masterSrv.loggedUserData.userId).subscribe((res:IAPIResponse) => {
      this.applicationList = res.data
    })
  }

  getAssignedApplications() {
    this.masterSrv.getApplicationsAssign(this.masterSrv.loggedUserData.userId).subscribe((res:IAPIResponse) => {
      this.applicationList = res.data
    })
  }

  setStatus(event: any, panNo:string ) {
    this.masterSrv.changeStatus(panNo,event.target.value ).subscribe((res:IAPIResponse) => {
      if (res.result) {
        alert("Status Changed")
      } else {
        alert(res.message);
      }

    })
  }
}
