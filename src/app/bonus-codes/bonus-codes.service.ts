import { Injectable } from '@angular/core';
import {GlobalConstants} from "../common/global-constants";
import {License} from "../licenses/license";
import {HttpClient} from "@angular/common/http";
import {BonusCode} from "./bonus-code";

@Injectable({
  providedIn: 'root'
})
export class BonusCodesService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getBonusCodes() {
    return this.http.get<BonusCode[]>(this.apiUrl + "/api/v1/bonusCode");
  }

  createBonusCodes(bonusCode: BonusCode) {
    return this.http.post<BonusCode>(this.apiUrl + "/api/v1/bonusCode", bonusCode);
  }
}
