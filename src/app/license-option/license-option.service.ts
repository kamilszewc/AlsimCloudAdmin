import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {LicenseType} from "../license-types/license-types.service";
import {LicenseOption} from "./license-option";
import {Message} from "../message";

@Injectable({
  providedIn: 'root'
})
export class LicenseOptionService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getLicenseOption(id: number) {
    return this.http.get<LicenseOption>(this.apiUrl + "/api/v1/licenseOption/" + id);
  }

  editLicenseOption(id: number, licenseOption: LicenseOption) {
    return this.http.put<LicenseOption>(this.apiUrl + "/api/v1/licenseOption/" + id, licenseOption);
  }

  deleteLicenseOption(id: number) {
    return this.http.delete<Message<string>>(this.apiUrl + "/api/v1/licenseOption/" + id);
  }
}
