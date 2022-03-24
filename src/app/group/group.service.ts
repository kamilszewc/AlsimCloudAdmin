import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {Group} from "../group";
import {Message} from "../message";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getGroup(id: number) {
    return this.http.get<Group>(this.apiUrl + "/api/v1/group/info/" + id);
  }

  removeGroup(id: number) {
    return this.http.delete<Message<string>>(this.apiUrl + "/api/v1/group/remove/" + id)
  }

  editGroup(id: number, group: Group) {
    return this.http.post<Group>(this.apiUrl + "/api/v1/group/edit/" + id, group)
  }
}
