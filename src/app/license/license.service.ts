import { Injectable } from '@angular/core';
import {GlobalConstants} from "../common/global-constants";
import {HttpClient} from "@angular/common/http";
import {License} from "../licenses/license";
import {Message} from "../message";

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  apiUrl: string

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getLicense(id: string) {
    return this.http.get<License>(this.apiUrl + "/api/v1/license/admin/" + id);
  }

  deleteLicense(id: string) {
    return this.http.delete<Message<string>>(this.apiUrl + "/api/v1/license/remove/" + id);
  }
}
