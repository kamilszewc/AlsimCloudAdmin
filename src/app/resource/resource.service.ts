import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {User} from "../user";
import {Resource} from "../resource";
import {Message} from "../message";

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
}
