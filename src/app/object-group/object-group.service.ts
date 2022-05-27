import { Injectable } from '@angular/core';
import {Message} from "../message";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Object, ObjectGroup} from "../object-groups/object-groups.service";
import {GlobalConstants} from "../common/global-constants";

@Injectable({
  providedIn: 'root'
})
export class ObjectGroupService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  generateObjectsRepositoryToken() {
    return this.http.get<Message<string>>(this.apiUrl + "/api/v1/token/generateObjectsRepositoryToken");
  }

  getGroup(id: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.get<ObjectGroup>(this.apiUrl + "/api/v1/objectsrepository/groups/" + id, httpOptions)
  }

  getObjects(groupId: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.get<Object[]>(this.apiUrl + "/api/v1/objectsrepository/groups/" + groupId + '/listObjects', httpOptions)
  }

  deleteGroup(groupId: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.delete<Message<string>>(this.apiUrl + "/api/v1/objectsrepository/groups/" + groupId, httpOptions);
  }

  editGroup(newGroup: ObjectGroup, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.put<ObjectGroup>(this.apiUrl + "/api/v1/objectsrepository/groups/" + newGroup.id
      + "?isPublic=" + newGroup.isPublic + "&description=" + newGroup.description + "&permission=" + newGroup.permission
      + "&quota=" + newGroup.quota, null, httpOptions);
  }

  uploadObject(type: string, formData: FormData, objectToUpload: Object, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    let url = this.apiUrl + "/api/v1/objectsrepository/objects?name=" + objectToUpload.name
      + "&description=" + objectToUpload.description + "&group=" + objectToUpload.group
      + "&isPublic=" + objectToUpload.isPublic

    if (objectToUpload.permission != null) {
      url += '&permission=' + objectToUpload.permission;
    }

    return this.http.post(url, formData, httpOptions);
  }

}
