import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlarmDialogService} from "../alarm-dialog/alarm-dialog.service";
import {LicenseService} from "./license.service";
import {NgForm} from "@angular/forms";
import {License} from "../licenses/license";

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {

  id!: string | null;

  @ViewChild('licenseForm') licenseForm!: NgForm;
  license!: License;
  isEditAllowed = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private licenseService: LicenseService,
              private alarmDialogService: AlarmDialogService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getLicense(this.id!)
  }

  getLicense(id: string) {
    this.licenseService.getLicense(this.id!).subscribe(license => {
      this.license = license;
    })
  }

  allowEdit() {
    this.isEditAllowed = true;
  }

  reload() {
    window.location.reload();
  }
}
