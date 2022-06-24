import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {LicenseType} from "../license-types/license-types.service";
import {License} from "./license";

@Injectable({
  providedIn: 'root'
})
export class LicensesService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getLicenses() {
    return this.http.get<License[]>(this.apiUrl + "/api/v1/license/admin");
  }

  getLicense(id: string) {
    return this.http.get<License>(this.apiUrl + "/api/v1/license/admin/" + id);
  }
}
