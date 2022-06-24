import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {License} from "./license";
import {interval} from "rxjs";
import {LicensesService} from "./licenses.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {LicenseType} from "../license-types/license-types.service";
import {User} from "../user";

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css']
})
export class LicensesComponent implements OnInit {

  @ViewChild('licensesPaginator') licensesPaginator!: MatPaginator;
  @ViewChild('licensesTable', {read: MatSort}) licensesSort!: MatSort;
  licenses = new MatTableDataSource<License>([]);
  isLoading = true;
  displayedColumns: string[] = ['id', 'licenseType', 'user', 'expirationTime', 'isEducational', 'isValid', 'details'];

  @ViewChild('newLicenseForm') newLicenseForm!: NgForm;
  newLicense: License = new class implements License {
    id: string | null = null;
    expirationTime: string | null = null;
    isEducational: boolean | null = null;
    isTrialPeriod: boolean | null = null;
    isValid: boolean | null = null;
    licenseType: LicenseType | null = null;
    startTime: string | null = null;
    tokens: number | null = null;
    user: User | null = null;
  }

  constructor(private licensesService: LicensesService,
              private router: Router) { }

  ngOnInit(): void {
    this.getLicenses();
    interval(60000).subscribe(value => {
      this.getLicenses();
    });
  }

  getLicenses() {
    this.licensesService.getLicenses()
      .subscribe(licenses => {
        this.licenses = new MatTableDataSource<License>(licenses)
        this.licenses.sort = this.licensesSort;
        this.licenses.paginator = this.licensesPaginator;
        this.isLoading = false;
      })
  }

  goTo(id: string) {
    this.router.navigate(['license', id]);
  }

}
