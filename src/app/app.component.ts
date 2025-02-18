import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MasterService } from './services/master.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HttpClientModule],  // ✅ Add HttpClientModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bankLoan';
  loggedUserData: any;

  masterSrv = inject(MasterService);

  // constructor(@Inject(PLATFORM_ID) private platformId: object) {
  //   if (isPlatformBrowser(this.platformId)) {
  //   }
  // }
  constructor(){
     this.masterSrv.onLogged$.subscribe((res:boolean)=>{
      if(res){
        this.masterSrv.loggedUserData();
      }
     })
  }

  logOff() {
    // if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('bankUser');
      this.masterSrv.loggedUserData = undefined;
    }
  }
// }
