import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlarmDialogMessage, AlarmDialogService} from "../alarm-dialog/alarm-dialog.service";
import {LicenseTypeService} from "./license-type.service";
import {NgForm} from "@angular/forms";
import {LicenseType} from "../license-types/license-types.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {LicenseOption} from "../license-option/license-option";

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

  @ViewChild('licenseOptionsPaginator') licrenseOptionsPaginator!: MatPaginator;
  @ViewChild('licenseOptionsTable', {read: MatSort}) licenseOptionsSort!: MatSort;
  licenseOptions = new MatTableDataSource<LicenseOption>([]);
  isLoading = true;
  displayedColumns: string[] = ['id', 'name', 'tokens', 'clientType', 'numberOfDays', 'isEducational', 'details'];

  clientTypes = ["ANY", "PRIVATE", "ENTERPRISE"]

  @ViewChild('newLicenseOptionForm') newLicenseOptionForm!: NgForm;
  newLicenseOption: LicenseOption = new class implements LicenseOption {
    id: number | null = null;
    name: string | null = "";
    licenseType: LicenseType | null = null;
    licenseTypeId: number | null = null;
    numberOfDays: number | null = 30;
    isEducational: boolean | null = false;
    tokens: number | null = 0.0;
    clientType: string | null = "ANY";
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private licenseTypeService: LicenseTypeService,
              private alarmDialogService: AlarmDialogService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.getLicenseType()
    this.getLicenseOptions()
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

  getLicenseOptions() {
    this.licenseTypeService.getLicenseOptions(this.id!).subscribe(licenseOptions => {
      this.licenseOptions = new MatTableDataSource<LicenseOption>(licenseOptions)
      this.licenseOptions.sort = this.licenseOptionsSort;
      this.licenseOptions.paginator = this.licrenseOptionsPaginator;
      this.isLoading = false;
    })
  }

  goTo(id: number) {
    this.router.navigate(['license-option', id]);
  }

  addNewLicenseOption() {
    this.newLicenseOption.licenseTypeId = this.id!;
    this.licenseTypeService.addLicenseOption(this.newLicenseOption).subscribe(
      licenseOption => {
        window.location.reload();
      },
        error => {
          const dialogMessage = new class implements AlarmDialogMessage {
            title = "Error"
            message = error.error.message
          };
          this.alarmDialogService.open(dialogMessage);
      })
  }
}
