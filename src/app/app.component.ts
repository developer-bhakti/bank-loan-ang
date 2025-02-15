
import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bankLoan';
  loggedUserData: any;

  // constructor(@Inject(PLATFORM_ID) private platformId: object) {
  //   if (isPlatformBrowser(this.platformId)) {
  //     const loggedData = sessionStorage.getItem("bankUser");
  //     if (loggedData !== null) {
  //       this.loggedUserData = JSON.parse(loggedData);
  //     }
  //   }

  constructor(){
    const loggedData = sessionStorage.getItem("bankUser");
    if(loggedData != null){
      this.loggedUserData = JSON.parse(loggedData)
    }
  }

    logOff(){
       sessionStorage.removeItem('bankUser');
    }
  }
