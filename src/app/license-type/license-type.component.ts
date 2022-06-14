import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlarmDialogService} from "../alarm-dialog/alarm-dialog.service";
import {LicenseTypeService} from "./license-type.service";

@Component({
  selector: 'app-license-type',
  templateUrl: './license-type.component.html',
  styleUrls: ['./license-type.component.css']
})
export class LicenseTypeComponent implements OnInit {

  id: number | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private licenseTypeService: LicenseTypeService,
              private alarmDialogService: AlarmDialogService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

}
