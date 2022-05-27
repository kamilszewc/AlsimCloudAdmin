import { Injectable } from '@angular/core';
import {GlobalConstants} from "../common/global-constants";
import {Message} from "../message";
import {HttpClient, HttpHeaders} from "@angular/common/http";

export interface Simulation {
  id: string;
  time: number;
  size: number;
  checksum: string;
  creationTime: string;
  modificationTime: string;
  url: string;
}

export interface ObjectUrls {
  object: string;
  thumbnail: string;
  icon: string;
  source: string;
}

export interface Object {
  id: string | null;
  name: string;
  group: string | null;
  description: string;
  extension: string | null;
  extensionIcon: string | null;
  extensionThumbnail: string | null;
  extensionSource: string | null;
  hasSource: string | null;
  hasSimulations: string | null;
  owner: string | null;
  permission: string | null;
  isPublic: boolean;
  size: string | null;
  checksum: string | null;
  creationTime: string | null;
  modificationTime: string | null;
  objectUrls: ObjectUrls | null;
  simulations: Simulation[] | null;
}

export interface ObjectGroup {
  id: string | null;
  description: string | null;
  owner: string | null;
  permission: string | null;
  isPublic: boolean | null;
  quota: number | null;
  size: number | null;
  creationTime: string | null;
  modificationTime: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ObjectGroupsService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  generateObjectsRepositoryToken() {
    return this.http.get<Message<string>>(this.apiUrl + "/api/v1/token/generateObjectsRepositoryToken");
  }

  getGroups(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.get<ObjectGroup[]>(this.apiUrl + "/api/v1/objectsrepository/groups", httpOptions)
  }

  createGroup(newGroup: ObjectGroup, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.http.post<ObjectGroup>(this.apiUrl + "/api/v1/objectsrepository/groups/" + newGroup.id
      + "?isPublic=" + newGroup.isPublic + "&description=" + newGroup.description + "&permission=" + newGroup.permission
      + "&quota=" + newGroup.quota, null, httpOptions);
  }
}
