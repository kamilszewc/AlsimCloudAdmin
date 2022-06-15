import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlarmDialogService} from "../alarm-dialog/alarm-dialog.service";
import {LicenseTypeService} from "./license-type.service";
import {NgForm} from "@angular/forms";
import {LicenseType} from "../license-types/license-types.service";

@Component({
  selector: 'app-license-type',
  templateUrl: './license-type.component.html',
  styleUrls: ['./license-type.component.css']
})
export class LicenseTypeComponent implements OnInit {

  id: number | undefined;
  isEditAllowed = false;
  isRemovalAllowed = false;

  @ViewChild('licenseTypeForm') licenseTypeForm!: NgForm;
  licenseType!: LicenseType;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private licenseTypeService: LicenseTypeService,
              private alarmDialogService: AlarmDialogService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.getLicenseType()
  }

  getLicenseType() {
    this.licenseTypeService.getLicenseType(this.id!).subscribe(licenseType => {
      this.licenseType = licenseType;
    })
  }

  allowEdit() {
    this.isEditAllowed = true;
  }

  editLicenseType() {
    this.licenseTypeService.editLicenseType(this.id!, this.licenseType!).subscribe(licenseType => {
        this.licenseType = licenseType;
        window.location.reload()
      }
    )
  }

  reload() {
    window.location.reload();
  }

  @ViewChild('deleteButton') deleteButton!: HTMLButtonElement;
  deleteLicenseType() {
    this.deleteButton.disabled = true;
    this.licenseTypeService.deleteLicenseType(this.id!).subscribe(
      message => {
        this.router.navigate(['license-types']);
      },
      error => {
        this.deleteButton.disabled = false;
      }
    )
  }

  allowRemoval() {
    this.isRemovalAllowed = true;
  }
}
