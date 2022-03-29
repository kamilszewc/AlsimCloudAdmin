import {Component, OnInit, ViewChild} from '@angular/core';
import {ResourcesService} from "./resources.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../user";
import {Resource} from "../resource";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  @ViewChild('resourcesPaginator') resourcesPaginator!: MatPaginator;
  @ViewChild('resourcesTable', {read: MatSort}) resourcesSort!: MatSort;
  resources = new MatTableDataSource<Resource>([]);
  isLoading = true;
  displayedColumns: string[] = ['id', 'name', 'description', 'suspended', 'cpuUsage', 'gpuUsage', 'ramUsage', 'version', 'details'];

  @ViewChild('newResourceForm') newResourcesForm!: NgForm;
  newResource: Resource = new class implements Resource {
    description: string | null = "";
    id: number | null = null;
    name: string | null = "";
    numberOfCpus: number | null = 0;
    numberOfCpusInUse: number | null = null;
    numberOfGpus: number | null = 0;
    numberOfGpusInUse: number | null = 0;
    ramMemory: number | null = 0;
    ramMemoryInUse: number | null = null;
    status: string | null = null;
    isSuspended: boolean | null = true;
    type: string | null = null;
    url: string | null = "";
    zone: number | null = 0;
    jwtSecret: string | null = "";
    version: string | null = "";
  }

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
        this.isLoading = false;
      })
  }

  addNewResource() {
    this.resourcesService.addNewEssResource(this.newResource).subscribe(resource => {
      window.location.reload();
      }
    )
  }

  goTo(id: number) {
    this.router.navigate(['resource', id])
  }

  bytesToMb(value: number) {
    return Math.floor(value / 1024 / 1024);
  }

}
