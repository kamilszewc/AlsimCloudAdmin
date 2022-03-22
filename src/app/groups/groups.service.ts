import { Injectable } from '@angular/core';
import {GlobalConstants} from "../common/global-constants";
import {HttpClient} from "@angular/common/http";
import {Group} from "../group";
import {Message} from "../message";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl =  GlobalConstants.apiUrl;
  }

  getAllGroups() {
    return this.http.get<Group[]>(this.apiUrl + "/api/v1/group/getAllGroups");
  }

  addNewGroup(group: Group) {
    return this.http.post<Group>(this.apiUrl + "/api/v1/group/new", group);
  }
}
