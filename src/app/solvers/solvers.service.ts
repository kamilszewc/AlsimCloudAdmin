import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {Message} from "../message";

export interface Solver {
  name: string | null;
  versions: Version[] | null;
}

export interface Version {
  version: string | null;
  solver: string | null;
  size: number | null;
  updateDateTime: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class SolversService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  generateSolversRepositoryToken() {
    return this.http.get<Message<string>>(this.apiUrl + "/api/v1/token/generateSolversRepositoryToken");
  }

  getSolvers(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.get<Solver[]>(this.apiUrl + "/api/v1/solvers", httpOptions);
  }

  removeVersion(solver: string, version: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.delete<string>(this.apiUrl + "/api/v1/solvers/" + solver + "/" + version, httpOptions);
  }
}
