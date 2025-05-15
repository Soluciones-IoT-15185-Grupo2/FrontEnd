import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../domain/models/user.model';
import { Credentials } from '../domain/value-objects/credentials.vo';

@Injectable()
export class AuthApiService {

  login(creds: Credentials): Observable<{ token: string; user: User }> {
    // TODO: sustituir 'of' por `this.http.post(...)`
    return of({
      token: 'fake-jwt-token',
      user: { id: '1', username: creds.username, email: 'alvarocrispin@gmail.com' }
    });
  }

  logout(): Observable<void> {
    // TODO: this.http.post('/api/logout', {})
    return of();
  }
}
