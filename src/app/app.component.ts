import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const loggedData = sessionStorage.getItem("bankUser");
      if (loggedData !== null) {
        this.loggedUserData = JSON.parse(loggedData);
      }
    }
  }

  logOff() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('bankUser');
    }
  }
}
