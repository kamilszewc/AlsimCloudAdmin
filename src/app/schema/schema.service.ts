import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {Schema} from "../schema";

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getSchema(id: number) {
    return this.http.get<Schema>(this.apiUrl + "/api/v1/schema/info/" + id);
  }

  getPaymentMethods() {
    return this.http.get<string[]>(this.apiUrl + "/api/v1/schema/getPaymentMethods")
  }

  editSchema(id: number, schema: Schema) {
    return this.http.post<Schema>(this.apiUrl + "/api/v1/schema/edit/" + id, schema);
  }

}
