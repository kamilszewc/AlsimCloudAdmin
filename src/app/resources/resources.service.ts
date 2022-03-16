import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {Resource} from "../resource";

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
}
