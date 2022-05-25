import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Message} from "../message";
import {Object, ObjectGroup} from "../object-groups/object-groups.service";
import {GlobalConstants} from "../common/global-constants";

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  generateObjectsRepositoryToken() {
    return this.http.get<Message<string>>(this.apiUrl + "/api/v1/token/generateObjectsRepositoryToken");
  }

  getObject(id: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.get<Object>(this.apiUrl + "/api/v1/objectsrepository/objects/" + id + "/description", httpOptions)
  }
}
