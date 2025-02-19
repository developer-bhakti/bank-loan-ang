import { Component, inject } from '@angular/core';
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
  applicationList: IApplicationList[] = [];

  ngOnInit() { // Use ngOnInit instead of constructor
    if (this.masterSrv.loggedUserData?.role === "Customer") { // Safe navigation
      this.getCustomerApplication();
    } else if (this.masterSrv.loggedUserData?.role) { // Check if role exists
      this.getAssignedApplications();
    } else {
      // Handle the case where loggedUserData or role is not available
      console.warn("User data or role not available yet.");
      // You might want to redirect the user, show a message, or do nothing.
    }
  }

  getCustomerApplication() {
    this.masterSrv.getMyApplication(this.masterSrv.loggedUserData.userId).subscribe((res: IAPIResponse) => {
      this.applicationList = res.data;
    });
  }

  getAssignedApplications() {
    this.masterSrv.getApplicationsAssign(this.masterSrv.loggedUserData.userId).subscribe((res: IAPIResponse) => {
      this.applicationList = res.data;
    });
  }

  setStatus(event: any, panNo: string) {
    this.masterSrv.changeStatus(panNo, event.target.value).subscribe((res: IAPIResponse) => {
      if (res.result) {
        alert("Status Changed");
      } else {
        alert(res.message);
      }
    });
  }
}



