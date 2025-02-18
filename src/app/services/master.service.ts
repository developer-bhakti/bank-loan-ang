import { IAPIResponse, ILoan, IUser } from './../model/loan';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  loggedUserData!: IUser;
  private http!: HttpClient; // Lazy load HttpClient

  constructor(private injector: Injector) {
    const loggedData = sessionStorage.getItem("bankUser");
    if (loggedData !== null) {
      this.loggedUserData = JSON.parse(loggedData);
    }

    // Lazy inject HttpClient to avoid circular dependency
    setTimeout(() => {
      this.http = this.injector.get(HttpClient);
    });
  }

  onSaveLoan(obj: ILoan) {
    return this.http.post<IAPIResponse>("https://projectapi.gerasim.in/api/BankLoan/AddNewApplication", obj);
  }

  getMyApplication(id: number) {
    return this.http.get<IAPIResponse>("https://projectapi.gerasim.in/api/BankLoan?customerId=" + id);
  }

  getApplicationsAssign(id: number) {
    return this.http.get<IAPIResponse>("https://projectapi.gerasim.in/api/BankLoan?bankEmployeeId=" + id);
  }
}
