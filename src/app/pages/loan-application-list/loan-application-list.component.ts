import { Component, inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IAPIResponse, IApplicationList } from '../../model/loan';

@Component({
  selector: 'app-loan-application-list',
  standalone: true,
  imports: [],
  templateUrl: './loan-application-list.component.html',
  styleUrl: './loan-application-list.component.css'
})
export class LoanApplicationListComponent {

  masterSrv = inject(MasterService);
  applicationList: IApplicationList [] = []

  constructor() {
    if(this.masterSrv.loggedUserData.role == "Customer") {

    } else {

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
}
