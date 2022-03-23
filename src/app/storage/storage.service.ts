import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {Message} from "../message";
import {StorageFile} from "../storageFile";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  generateStorageManagerToken(taskId: number) {
    return this.http.get<Message>(this.apiUrl + "/api/v1/token/generateStorageManagerToken/" + taskId);
  }

  getInputFiles(token: string) {
    return this.http.get<StorageFile[]>(this.apiUrl + "/api/v1/storage/");
  }

  getOutputFiles(token: string) {
    return this.http.get<StorageFile[]>(this.apiUrl + "/api/v1/storage/");
  }

  getLogFiles(token: string) {
    return this.http.get<StorageFile[]>(this.apiUrl + "/api/v1/storage/");
  }
}
