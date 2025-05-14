import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TranslationApiService {
  private baseUrl = '/api/translations';

  constructor(private http: HttpClient) {}

  translateGesture(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/gesture`, payload);
  }

  translateText(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/text`, payload);
  }

  getStatus(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}/status`);
  }

  getHistory(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}/history`);
  }
}
