import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {EducationalDomain} from "../educationalDomain";
import {Message} from "../message";

@Injectable({
  providedIn: 'root'
})
export class EducationalDomainsService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getAllDomain() {
    return this.httpClient.get<EducationalDomain[]>(this.apiUrl + "/api/v1/educationalDomain");
  }

  removeDomain(domainName: string) {
    return this.httpClient.delete<Message>(this.apiUrl + "/api/v1/educationalDomain/" + domainName);
  }

  addDomain(domainName: string) {
    return this.httpClient.post<Message>(this.apiUrl + "/api/v1/educationalDomain/" + domainName, null);
  }

  checkDomain(domainName: string) {
    return this.httpClient.get<Message>(this.apiUrl + "/api/v1/educationalDomain/" + domainName);
  }
}
