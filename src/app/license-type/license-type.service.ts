import { Injectable } from '@angular/core';
import {GlobalConstants} from "../common/global-constants";
import {HttpClient} from "@angular/common/http";
import {LicenseType} from "../license-types/license-types.service";
import {Message} from "../message";
import {LicenseOption} from "../license-option/license-option";

@Injectable({
  providedIn: 'root'
})
export class LicenseTypeService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getLicenseType(id: number) {
    return this.http.get<LicenseType>(this.apiUrl + "/api/v1/licenseType/" + id);
  }

  editLicenseType(id: number, licenseType: LicenseType) {
    return this.http.put<LicenseType>(this.apiUrl + "/api/v1/licenseType/" + id, licenseType);
  }

  deleteLicenseType(id: number) {
    return this.http.delete<Message<string>>(this.apiUrl + "/api/v1/licenseType/" + id);
  }

  getLicenseOptions(id: number) {
    return this.http.get<LicenseOption[]>(this.apiUrl + "/api/v1/licenseOption?licenseTypeId=" + id);
  }

  addLicenseOption(licenseOption: LicenseOption) {
    return this.http.post<LicenseOption[]>(this.apiUrl + "/api/v1/licenseOption", licenseOption);
  }
}
