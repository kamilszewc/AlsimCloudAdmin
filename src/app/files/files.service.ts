import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  apiUrl: string

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getAllFilesOfType(type: string) {
    return this.http.get<File[]>(this.apiUrl + "/api/v1/files/listFiles/" + type);
  }

  deleteFile(id: number) {
    return this.http.delete(this.apiUrl + "/api/v1/files/deleteFile/" + id);
  }
}
