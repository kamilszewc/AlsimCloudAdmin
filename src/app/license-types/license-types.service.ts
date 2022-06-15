import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";

export interface LicenseType {
  id: number | null;
  name: string | null;
  maxNumberOfLicensesPerUser: number | null;
  numberOfTrialDays: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class LicenseTypesService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getLicenseTypes() {
    return this.http.get<LicenseType[]>(this.apiUrl + "/api/v1/licenseType");
  }

  newLicenseType(licenseType: LicenseType) {
    return this.http.post<LicenseType[]>(this.apiUrl + "/api/v1/licenseType", licenseType);
  }

}
