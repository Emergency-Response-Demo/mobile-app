import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { MessageService } from './message.service';
import { of } from 'rxjs/internal/observable/of';
import { Responder } from '../models/responder';
import { Socket } from 'ngx-socket-io';
import { MobileServiceConfigurations } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ResponderService {

  constructor(private messageService: MessageService, private http: HttpClient, private socket: Socket, private serverConfig: MobileServiceConfigurations) { }

  async getByName(name: string): Promise<Responder> {
    const url = `${this.serverConfig.getServerUrl()}/responder-service/responder/byname/${name}`;
    return this.http.get<Responder>(url).pipe(
      catchError(res => this.handleError('getResponder()', res))
    ).toPromise();
  }

  async update(responder: Responder): Promise<any> {
    const url = `${this.serverConfig.getServerUrl()}/responder-service/responder`;
    return this.http.put<any>(url, responder).pipe(
      catchError(res => this.handleError('update()', res))
    ).toPromise();
  }

  watchLocation(responder?: Responder): Observable<any> {
    return Observable.create(observer => {
      this.socket.on('topic-responder-location-update', msg => {
        if (!msg || (!!responder && msg.responderId !== `${responder.id}`)) {
          return;
        }
        observer.next(msg);
      });
    });
  }

  private handleError(method: string, res: HttpErrorResponse): Observable<any> {
    if (res.status === 404 && method === 'getResponder()') {
      return of(new Responder());
    } else {
      this.messageService.error(`${method} ${res.message}`);
      console.error(res.error);
      return of(null);
    }
  }
}
