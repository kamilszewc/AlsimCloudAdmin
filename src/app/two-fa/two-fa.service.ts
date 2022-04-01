import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {Message} from "../message";

export interface TwoFA {
  qrCode: string | null;
  secret: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class TwoFaService {

  constructor(private http: HttpClient) { }

  getQtCode() {
    return this.http.get<TwoFA>(GlobalConstants.apiUrl + "/api/v1/twoFA/getQrCode");
  }

  enableTwoFa(code: string) {
    return this.http.post<Message<string>>(GlobalConstants.apiUrl + "/api/v1/twoFA/enableTwoFA/" + code, null);
  }

  disableTwoFa(code: string) {
    return this.http.post<Message<string>>(GlobalConstants.apiUrl + "/api/v1/twoFA/disableTwoFA/" + code, null);
  }
}
