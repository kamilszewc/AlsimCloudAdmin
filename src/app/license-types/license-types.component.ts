import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {CloudResource, Resource} from "../resource";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {LicenseType, LicenseTypesService} from "./license-types.service";
import {interval} from "rxjs";
import {AlarmDialogMessage, AlarmDialogService} from "../alarm-dialog/alarm-dialog.service";

@Component({
  selector: 'app-license-types',
  templateUrl: './license-types.component.html',
  styleUrls: ['./license-types.component.css']
})
export class LicenseTypesComponent implements OnInit {

  @ViewChild('licenseTypesPaginator') licrenseTypesPaginator!: MatPaginator;
  @ViewChild('licenseTypesTable', {read: MatSort}) licenseTypesSort!: MatSort;
  licenseTypes = new MatTableDataSource<LicenseType>([]);
  isLoading = true;
  displayedColumns: string[] = ['id', 'name', 'maxNumberOfLicensesPerUser', 'numberOfTrialDays', 'details'];

  @ViewChild('newLicenseTypeForm') newLicenseTypeForm!: NgForm;
  newLicenseType: LicenseType = new class implements LicenseType {
    id: number | null = null;
    name: string | null = "";
    maxNumberOfLicensesPerUser: number | null = 1;
    numberOfTrialDays: number | null = 30;
  }

  constructor(private licenseTypesService: LicenseTypesService,
              private router: Router,
              private alarmDialogService: AlarmDialogService) { }

  ngOnInit(): void {
    this.getLicenseTypes();
    interval(60000).subscribe(value => {
      this.getLicenseTypes();
    });
  }

  private getLicenseTypes() {
    this.licenseTypesService.getLicenseTypes()
      .subscribe(licenseTypes => {
        this.licenseTypes = new MatTableDataSource<LicenseType>(licenseTypes)
        this.licenseTypes.sort = this.licenseTypesSort;
        this.licenseTypes.paginator = this.licrenseTypesPaginator;
        this.isLoading = false;
      })
  }

  goTo(id: number) {
    this.router.navigate(['license-type', id]);
  }

  addNewLicenseType() {
    console.log(this.newLicenseType)
    this.licenseTypesService.newLicenseType(this.newLicenseType).subscribe(
      licenseType => {
        window.location.reload();
      },
      error => {
        const dialogMessage = new class implements AlarmDialogMessage {
          title = "Error"
          message = error.error.message
        };
        this.alarmDialogService.open(dialogMessage);
      }
    )
  }


}
