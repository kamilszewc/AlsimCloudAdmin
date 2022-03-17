import { Injectable } from '@angular/core';
import {ResourcesService} from "../resources/resources.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {QueueEntry} from "../queueEntry";

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getSchemaTasks() {
    return this.http.get<Task[]>(this.apiUrl + "");
  }



}
