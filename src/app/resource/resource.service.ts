import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {User} from "../user";
import {Resource} from "../resource";

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

}
