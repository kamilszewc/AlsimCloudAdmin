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
  id: string;
  name: string;
  group: string;
  description: string;
  extension: string;
  extensionIcon: string;
  extensionThumbnail: string;
  extensionSource: string;
  hasSource: boolean;
  hasSimulations: boolean;
  owner: string;
  permission: string;
  isPublic: string;
  size: number;
  checksum: string;
  creationTime: string;
  modificationTime: string;
  objectUrls: ObjectUrls;
  simulations: Simulation[] | null;
}

export interface ObjectGroup {
  id: string;
  description: string;
  owner: string;
  permission: string;
  isPublic: boolean;
  quota: number;
  size: number;
  creationTime: string;
  modificationTime: string;
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

}
