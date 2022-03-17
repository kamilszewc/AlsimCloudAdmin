import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {QueueEntry} from "../queueEntry";

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  apiUrl: String;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getQueue() {
    return this.http.get<QueueEntry[]>(this.apiUrl + "/api/v1/queue/getQueue");
  }

  risePriority(id: number) {
    return this.http.post<any>(this.apiUrl + "/api/v1/queue/risePriority/" + id, null);
  }

  dropPriority(id: number) {
    return this.http.post<any>(this.apiUrl + "/api/v1/queue/dropPriority/" + id, null);
  }

  setPriority(id: number, priority: number) {
    return this.http.post<any>(this.apiUrl + "/api/v1/queue/setPriority/" + id + "/" + priority, null);
  }

  deleteEntry(id: number) {
    return this.http.delete<any>(this.apiUrl + "/api/v1/queue/delete/" + id);
  }

}
