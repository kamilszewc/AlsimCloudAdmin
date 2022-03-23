import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.get<StorageFile[]>(this.apiUrl + "/api/v1/storage/group/filenamesAndDescriptionsList?fileType=INPUT", httpOptions);
  }

  getOutputFiles(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.get<StorageFile[]>(this.apiUrl + "/api/v1/storage/group/filenamesAndDescriptionsList?fileType=OUTPUT", httpOptions);
  }

  getLogFiles(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.get<StorageFile[]>(this.apiUrl + "/api/v1/storage/group/filenamesAndDescriptionsList?fileType=LOG", httpOptions);
  }
}
