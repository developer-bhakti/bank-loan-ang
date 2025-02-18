import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, PLATFORM_ID, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  showRegisterForm = signal<boolean>(false);
  http = inject(HttpClient);
  router = inject(Router);
  // isBrowser: boolean;
  masterSrv = inject(MasterService)

  // constructor(@Inject(PLATFORM_ID) private platformId: object) {
  //   this.isBrowser = isPlatformBrowser(platformId);
  // }

  customerObj: any = {
    "userId": 0,
    "userName": "",
    "emailId": "",
    "fullName": "",
    "password": ""
  };

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(""),
    password: new FormControl("")
  });

  changeView() {
    this.showRegisterForm.set(!this.showRegisterForm());
  }

  onRegister() {
    this.http.post("https://projectapi.gerasim.in/api/BankLoan/RegisterCustomer", this.customerObj).subscribe(
      (res: any) => {
        if (res.result) {
          alert("Customer Registered Successfully");
        } else {
          alert(res.message);
        }
      },
      error => {
        alert("Network Error")
      })
  }

onLogin() {
  debugger;
  const formValue = this.loginForm.value;
  this.http.post("https://projectapi.gerasim.in/api/BankLoan/login", formValue).subscribe((res: any) => {
    debugger;
      if (res.result) {
          sessionStorage.setItem("bankUser", JSON.stringify(res.data));
          this.router.navigateByUrl("application-list");
          this.masterSrv.onLogged$.next(true)
      } else {
        alert(res.message);
      }
    },error => {
      alert("Network Error");
    })
  }
}
