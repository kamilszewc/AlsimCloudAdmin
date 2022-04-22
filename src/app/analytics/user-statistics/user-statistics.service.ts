import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GlobalConstants} from "../../common/global-constants";
import {Message} from "../../message";
import {shareReplay, tap} from "rxjs";

export interface HeaderDescription {
  id: number;
  name: string;
  description: string;
  button: string;
}

export interface TimeValueData {
  x: Date[];
  y: number[];
  title: string;
  xlabel: string;
  ylabel: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserStatisticsService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  generateAnalyticsGrabberToken() {
    return this.http.get<Message<string>>(this.apiUrl + "/api/v1/token/generateAnalyticsGrabberToken");
  }

  getHeadersForPlotting(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.get<Map<string, HeaderDescription>>(this.apiUrl + "/api/v1/analytics/user/getHeadersForPlotting", httpOptions);
  }

  getDataForPlotting(header: string, token: string, timeRange: number | null) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    let parameter = ""
    if (timeRange != null) {
      parameter = "?timeRange=" + timeRange;
    }

    return this.http.get<TimeValueData>(this.apiUrl + "/api/v1/analytics/user/getDataForPlotting/" + header + parameter, httpOptions)
      .pipe(tap((timeValueData: TimeValueData) => {

        timeValueData.x = timeValueData.x.map(date => {
          return new Date(date)
        })

        return timeValueData;
      }));
  }
}
