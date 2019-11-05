import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

import { Mission } from '../models/mission';
import { Responder } from '../models/responder';
import { TopicMissionEvent } from '../models/topic';

import { MobileServiceConfigurations } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  async getByResponder(responder: Responder): Promise<Mission> {
    const url = `${this.serviceConfig.getServerUrl()}/mission-service/api/missions/responders/${responder.id}`;
    return this.http.get<Mission[]>(url).pipe(
      catchError(err => this.handleError('getByResponder()', err))
    ).toPromise();
  }

  watchByResponder(responder: Responder): Observable<Mission> {
    return Observable.create(observer => {
      this.socket.on('topic-mission-event', (mission: TopicMissionEvent) => {
        if (!mission.body || `${mission.body.responderId}` !== `${responder.id}`) {
          return;
        }
        observer.next(mission.body);
      });
    });
  }

  private handleError(method: string, res: HttpErrorResponse): Observable<any> {
    this.messageService.error(`${method} ${res.message}`);
    return of(null);
  }

  constructor(private messageService: MessageService, private http: HttpClient, private socket: Socket, private serviceConfig: MobileServiceConfigurations) { }
}
