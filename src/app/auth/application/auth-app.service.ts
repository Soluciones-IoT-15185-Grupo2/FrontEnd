import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Credentials } from '../domain/value-objects/credentials.vo';
import {AuthApiService} from '../infraestructure/auth-api.service';

@Injectable()
export class AuthAppService {
  constructor(private api: AuthApiService) {}

  login(username: string, password: string): Observable<void> {
    const creds = new Credentials(username, password);
    // @ts-ignore
    return this.api.login(creds).pipe(
      tap(res => {
        // guarda el token y datos en localStorage/session…
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      }),
      // map a void para ocultar detalles
      tap(() => {})
    );
  }

  logout(): Observable<void> {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    return this.api.logout().pipe(
      tap(() => { })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }



}
