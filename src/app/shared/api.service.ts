import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LeaderboardEntry } from './models';
import { DB_URL, SECRET_KEY } from './constants';
import { mapGetResponse, mapPutResponse } from './utils';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public fetchLeaderboard$(): Observable<LeaderboardEntry[]> {
    return this.http
      .get(DB_URL, { headers: new HttpHeaders({ 'secret-key': SECRET_KEY }) })
      .pipe(map(mapGetResponse));
  }

  public updateLeaderboard$([payload, headers]: [string, HttpHeaders]): Observable<
    LeaderboardEntry[]
  > {
    return this.http
      .put(DB_URL, payload, { headers })
      .pipe(map(mapPutResponse));
  }
}
