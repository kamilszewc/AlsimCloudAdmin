import {Component, OnInit, ViewChild} from '@angular/core';
import {EducationalDomainsService} from "./educational-domains.service";
import {EducationalDomain} from "../educationalDomain";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-educational-domains',
  templateUrl: './educational-domains.component.html',
  styleUrls: ['./educational-domains.component.css']
})
export class EducationalDomainsComponent implements OnInit {

  domains = new MatTableDataSource<EducationalDomain>([]);
  @ViewChild('educationalDomainsPaginator') educationalDomainsPaginator!: MatPaginator;
  @ViewChild('educationalDomainsTable', {read: MatSort}) educationalDomainsSort!: MatSort;
  displayedColumns: string[] = ['id', 'name', 'domain', 'country', 'remove'];

  @ViewChild('newEducationalDomain') newEducationalDomainForm!: NgForm;
  domain =  new class implements EducationalDomain {
    country: string | null = 'AT';
    domain: string | null = '';
    id: number | null = null;
    name: string | null = '';
  }
  countries: Map<string, string> | undefined;

  constructor(private educationalDomainsService: EducationalDomainsService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllDomains()

    this.educationalDomainsService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  getAllDomains() {
    this.educationalDomainsService.getAllDomains().subscribe(domains => {
      this.domains = new MatTableDataSource<EducationalDomain>(domains);
      this.domains.sort = this.educationalDomainsSort;
      this.domains.paginator = this.educationalDomainsPaginator;
    })
  }

  removeDomain(domainName: string) {
    this.educationalDomainsService.removeDomain(domainName).subscribe(message => {
      window.location.reload();
    })
  }

  addDomain() {
    this.educationalDomainsService.addDomain(this.domain!.domain).subscribe(domain => {
      window.location.reload();
    })
  }

  checkDomain(domainName: string) {
    this.educationalDomainsService.checkDomain(domainName).subscribe(message => {
    })
  }

  goTo(id: number) {
    this.router.navigate(['educationalDomains'])
  }
}
