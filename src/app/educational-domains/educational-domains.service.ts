import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {EducationalDomain} from "../educationalDomain";
import {Message} from "../message";
import {map} from "rxjs";
import {KeyValuePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class EducationalDomainsService {

  apiUrl: string;

  constructor(private httpClient: HttpClient,
              private keyValue: KeyValuePipe) {

    this.apiUrl = GlobalConstants.apiUrl;
  }

  getAllDomains() {
    return this.httpClient.get<EducationalDomain[]>(this.apiUrl + "/api/v1/educationalDomain");
  }

  removeDomain(domainName: string) {
    return this.httpClient.delete<Message>(this.apiUrl + "/api/v1/educationalDomain/" + domainName);
  }

  addDomain(domainName: string | null) {
    return this.httpClient.post<Message>(this.apiUrl + "/api/v1/educationalDomain/" + domainName, null);
  }

  checkDomain(domainName: string) {
    return this.httpClient.get<Message>(this.apiUrl + "/api/v1/educationalDomain/" + domainName);
  }

  getCountries() {
    return this.httpClient.get<any>(this.apiUrl + "/api/v1/user/getCountries")
      .pipe(
        map(data => {
          return new Map(this.keyValue.transform<string, string>(data).map(element => [element.value, element.key]));
        })
      )
  }
}
