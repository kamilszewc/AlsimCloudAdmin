import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {User} from "../user";
import {Resource} from "../resource";
import {Message} from "../message";
import {Task} from "../task";
import {SystemResources} from "../systemResources";

export interface RunCase {
  runnerId: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getResource(id: number) {
    return this.http.get<Resource>(this.apiUrl + "/api/v1/resource/info/" + id);
  }

  deleteResource(id: number) {
    return this.http.delete<Message<string>>(this.apiUrl + "/api/v1/resource/remove/" + id)
  }

  editResources(id: number, resource: Resource) {
    return this.http.post<Resource>(this.apiUrl + "/api/v1/resource/edit/" + id, resource);
  }

  getRunningTasks(id: number) {
    return this.http.get<Task[]>(this.apiUrl + "/api/v1/task/findTasks?resourceId=" + id + "&isInRemoteRunner=true");
  }

  getSystemResources(id: number) {
    return this.http.get<SystemResources>(this.apiUrl + "/api/v1/resource/getSystemResources/" + id);
  }


  generateAnalyticsGrabberToken() {
    return this.http.get<Message<string>>(this.apiUrl + "/api/v1/token/generateAnalyticsGrabberToken");
  }

  getRunCaseResourceStatistics(id: number, year: number, mounth: number, analyticsGrabberToken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + analyticsGrabberToken
      })
    };

    return this.http.get<RunCase[]>(this.apiUrl + "/api/v1/analytics/resourceStatistics/getRunCases/" + year + "/" + mounth + "?resourceId=" + id, httpOptions)
  }
}
