import { Injectable } from '@angular/core';
import {Schema} from "../schema";
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {SchemaCategory} from "../schemaCategory";

@Injectable({
  providedIn: 'root'
})
export class SchemasService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getSchemas() {
    return this.http.get<Schema[]>(this.apiUrl + "/api/v1/schema/getAllSchemas");
  }

  getPaymentMethods() {
    return this.http.get<string[]>(this.apiUrl + "/api/v1/schema/getPaymentMethods")
  }

  addNewSchema(schema: Schema) {
    return this.http.post<Schema>(this.apiUrl + "/api/v1/schema/new", schema);
  }

  getAllSchemaCategories() {
    return this.http.get<SchemaCategory[]>(this.apiUrl + "/api/v1/schemaCategory");
  }
}
