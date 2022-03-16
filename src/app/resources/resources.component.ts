import {Component, OnInit, ViewChild} from '@angular/core';
import {ResourcesService} from "./resources.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../user";
import {Resource} from "../resource";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  @ViewChild('resourcesPaginator') resourcesPaginator!: MatPaginator;
  @ViewChild('resourcesTable', {read: MatSort}) resourcesSort!: MatSort;
  resources = new MatTableDataSource<Resource>([]);

  displayedColumns: string[] = ['id', 'name', 'description', 'suspended', 'cpuUsage', 'gpuUsage', 'ramUsage', 'details'];

  constructor(private resourcesService: ResourcesService,
              private router: Router) { }

  ngOnInit(): void {
    this.getResources()
  }

  getResources() {
    this.resourcesService.getResources()
      .subscribe(resources => {
        this.resources = new MatTableDataSource<Resource>(resources)
        this.resources.sort = this.resourcesSort;
        this.resources.paginator = this.resourcesPaginator;
      })
  }

  goTo(id: number) {
    this.router.navigate(['resource', id])
  }

  bytesToMb(value: number) {
    return Math.floor(value / 1024 / 1024);
  }

}
