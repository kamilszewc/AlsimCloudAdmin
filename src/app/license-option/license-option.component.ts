import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlarmDialogService} from "../alarm-dialog/alarm-dialog.service";
import {LicenseOptionService} from "./license-option.service";
import {NgForm} from "@angular/forms";
import {LicenseType} from "../license-types/license-types.service";
import {LicenseOption} from "./license-option";

@Component({
  selector: 'app-license-option',
  templateUrl: './license-option.component.html',
  styleUrls: ['./license-option.component.css']
})
export class LicenseOptionComponent implements OnInit {

  id!: number;

  @ViewChild('licenseOptionForm') licenseOptionForm!: NgForm;
  licenseOption!: LicenseOption;

  isEditAllowed = false;
  isRemovalAllowed = false;

  clientTypes = ["ANY", "PRIVATE", "ENTERPRISE"]

  constructor(private route: ActivatedRoute,
              private router: Router,
              private licenseOptionService: LicenseOptionService,
              private alarmDialogService: AlarmDialogService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.getLicenseOption()
  }

  getLicenseOption() {
    this.licenseOptionService.getLicenseOption(this.id!).subscribe(licenseOption => {
      this.licenseOption = licenseOption;
    })
  }

  allowEdit() {
    this.isEditAllowed = true;
  }

  reload() {
    window.location.reload();
  }

  editLicenseOption() {
    this.licenseOptionService.editLicenseOption(this.id!, this.licenseOption!).subscribe(licenseOption => {
        this.licenseOption = licenseOption;
        window.location.reload()
      }
    )
  }

  allowRemoval() {
    this.isRemovalAllowed = true;
  }

  @ViewChild('deleteButton') deleteButton!: HTMLButtonElement;
  deleteLicenseType() {
    this.deleteButton.disabled = true;
    this.licenseOptionService.deleteLicenseOption(this.id!).subscribe(
      message => {
        this.router.navigate(['license-type', this.licenseOption.licenseTypeId]);
      },
      error => {
        this.deleteButton.disabled = false;
      }
    )
  }
}
