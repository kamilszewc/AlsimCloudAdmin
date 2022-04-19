import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {SchemaCategory} from "../schemaCategory";

@Injectable({
  providedIn: 'root'
})
export class SchemaCategoriesService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getSchemaCategory(id: number) {
    return this.http.get<SchemaCategory>(this.apiUrl + "/api/v1/schemaCategory/" + id);
  }

  getAllSchemaCategories() {
    return this.http.get<SchemaCategory[]>(this.apiUrl + "/api/v1/schemaCategory");
  }

  removeSchemaCategory(id: number) {
    return this.http.delete<string>(this.apiUrl + "/api/v1/schemaCategory");
  }

  newSchemaCategory(name: string, iconFileId: number) {
    let body = {name, iconFileId};
    console.log(body);
    return this.http.post<SchemaCategory>(this.apiUrl + "/api/v1/schemaCategory", body);
  }

  changeSchemaCategory(id: number, name: string | undefined, iconFileId: number | undefined) {
    let body = {name, iconFileId};
    console.log(body);
    return this.http.put<SchemaCategory>(this.apiUrl + "/api/v1/schemaCategory/" + id, body);
  }
}
