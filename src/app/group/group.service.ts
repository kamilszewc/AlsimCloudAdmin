import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {Group} from "../group";

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
}
