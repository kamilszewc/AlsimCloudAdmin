import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Message} from "../message";
import {Object, ObjectGroup, Simulation} from "../object-groups/object-groups.service";
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

  deleteObject(id: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.delete<Message<string>>(this.apiUrl + "/api/v1/objectsrepository/objects/" + id, httpOptions)
  }

  uploadSimulation(id: string, type: any, formData: FormData, time: number, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.post<Simulation>(this.apiUrl + "/api/v1/objectsrepository/objects/" + id + '/simulation?time=' + time, formData, httpOptions)
  }

  deleteSimulation(id: string, time: number, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.delete<Simulation>(this.apiUrl + "/api/v1/objectsrepository/objects/" + id + '/simulation/' + time, httpOptions);
  }

}
