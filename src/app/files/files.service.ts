import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {Myfile} from "../myfile"

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  apiUrl: string

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getAllFilesOfType(type: string) {
    return this.http.get<Myfile[]>(this.apiUrl + "/api/v1/files/listFiles/" + type);
  }

  deleteFile(id: number) {
    return this.http.delete(this.apiUrl + "/api/v1/files/deleteFile/" + id);
  }

  uploadFile(type: string, formData: FormData) {
    const httpOptions = {
      headers: new HttpHeaders({
        //"Content-Type": "multipart/form-data"
      })
    };
    return this.http.post(this.apiUrl + "/api/v1/files/uploadFile/" + type, formData, httpOptions);
  }
}
