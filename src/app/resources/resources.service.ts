import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {Resource, CloudResource, CloudInstanceInfo} from "../resource";
import {Task} from "../task";

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  apiUrl: String;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getResources() {
    return this.http.get<Resource[]>(this.apiUrl + "/api/v1/resource/getAllResources");
  }

  addNewEssResource(resource: Resource) {
    return this.http.post<Resource>(this.apiUrl + "/api/v1/resource/ess/new", resource);
  }

  addNewAwsResource(resource: CloudResource) {
    return this.http.post<Resource>(this.apiUrl + "/api/v1/resource/aws/new", resource);
  }

  getAwsAvailableInstances() {
    return this.http.get<CloudInstanceInfo[]>(this.apiUrl + "/api/v1/resource/aws/availableInstances");
  }

  addNewGenesisResource(resource: CloudResource) {
    return this.http.post<Resource>(this.apiUrl + "/api/v1/resource/genesis/new", resource);
  }

  getGenesisAvailableInstances() {
    return this.http.get<CloudInstanceInfo[]>(this.apiUrl + "/api/v1/resource/genesis/availableInstances");
  }

  getRunningTasks() {
    return this.http.get<Task[]>(this.apiUrl + "/api/v1/task/findTasks?isInRemoteRunner=true");
  }
}
