import {HttpHeaders} from "@angular/common/http";

const user = "admin";
const password = "C@ffee1410!";

export class GlobalConstants {
  public static apiUrl = "https://alsimcloud.com"
  public static headers = new HttpHeaders( {
    authorization : 'Basic ' + btoa( user + ':' + password)
  });
}
