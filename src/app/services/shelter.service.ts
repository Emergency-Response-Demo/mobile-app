import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Shelter } from '../models/shelter';
import { MobileServiceConfigurations } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {
    async getShelters(): Promise<Shelter[]> {
      return this.http.get<Shelter[]>(`${this.serverConfig.getServerUrl()}/shelter-service/api/shelters`).pipe(
        catchError(res => this.handleError('getShelters()', res))
      ).toPromise();
    }

    private handleError(method: string, res: HttpErrorResponse): Observable<any> {
      this.messageService.error(`${method} ${res.message}`);
      console.error(res.error);
      return of(null);
    }

    constructor(private messageService: MessageService, private http: HttpClient, private serverConfig: MobileServiceConfigurations) { }
}
