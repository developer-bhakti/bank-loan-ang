import { IAPIResponse, ILoan } from './../model/loan';
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core'; // Import PLATFORM_ID and Inject
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  onLogged$: Subject<boolean> = new Subject<boolean>();
  loggedUserData: any; // No need for definite assignment assertion (!)

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) {
    this.readLoggedData();
  }

  readLoggedData() {
    if (isPlatformBrowser(this.platformId)) { // Check for browser environment
      const loggedData = sessionStorage.getItem("bankUser");
      if (loggedData) {
        this.loggedUserData = JSON.parse(loggedData);
      }
    } else {
      console.warn("sessionStorage is not available in this environment.");
      // Handle appropriately (e.g., set a default value or do nothing)
      this.loggedUserData = null; // Or some other default value
    }
  }

  onSaveLoan(obj: ILoan) {
    return this.http.post<IAPIResponse>(
      "https://projectapi.gerasim.in/api/BankLoan/AddNewApplication",
      obj
    );
  }

  getMyApplication(id: number) {
    return this.http.get<IAPIResponse>(
      `https://projectapi.gerasim.in/api/BankLoan/GetMyApplications?customerId=${id}`
    );
  }

  getApplicationsAssign(id: number) {
    return this.http.get<IAPIResponse>(
      `https://projectapi.gerasim.in/api/BankLoan/GetApplicationAssigneedToMe?bankEmployeeId=${id}`
    );
  }

  changeStatus(panNo: string, status: string) {
    return this.http.get<IAPIResponse>(
      `https://projectapi.gerasim.in/api/BankLoan/CheckApplicationStatus?panNo=${panNo}&status=${status}`
    );
  }
}
