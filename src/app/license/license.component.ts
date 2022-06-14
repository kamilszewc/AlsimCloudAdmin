import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlarmDialogService} from "../alarm-dialog/alarm-dialog.service";
import {LicenseService} from "./license.service";

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {

  id: number | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private licenseService: LicenseService,
              private alarmDialogService: AlarmDialogService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

}
