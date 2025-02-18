import { IAPIResponse, ILoan, IUser } from './../model/loan';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  onLogged$: Subject<boolean> = new Subject<boolean>();

  loggedUserData!: any;

  private http!: HttpClient; // Lazy load HttpClient

  constructor(private httpr: HttpClient) {
     this.loggedUserData()
  }

  readLoggedData() {
    const loggedData = sessionStorage.getItem("bankUser");
    if (loggedData != null) {
      this.loggedUserData = JSON.parse(loggedData);
    }
  }

  onSaveLoan(obj: ILoan) {
    return this.http.post<IAPIResponse>("https://projectapi.gerasim.in/api/BankLoan/AddNewApplication", obj);
  }

  getMyApplication(id: number) {
    return this.http.get<IAPIResponse>("https://projectapi.gerasim.in/api/BankLoan/GetMyApplications?customerId=" + id);
  }

  getApplicationsAssign(id: number) {
    return this.http.get<IAPIResponse>("https://projectapi.gerasim.in/api/BankLoan/GetApplicationAssigneedToMe?bankEmployeeId" + id);
  }

  changeStatus(panNo: string, status: string) {
    return this.http.get<IAPIResponse>("https://projectapi.gerasim.in/api/BankLoan/CheckApplicationStatus?panNo="+panNo+"&status=" + status);
  }
}
