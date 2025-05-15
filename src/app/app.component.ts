import { Component } from '@angular/core';
import {AuthAppService} from './auth/application/auth-app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SmartSign';

  constructor(
    public auth: AuthAppService,
    private router: Router
  ) {}

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
