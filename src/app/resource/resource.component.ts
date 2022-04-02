import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ResourceService} from "./resource.service";
import {Resource} from "../resource";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NgForm} from "@angular/forms";
import {User} from "../user";
import {MatTableDataSource} from "@angular/material/table";
import {Task} from "../task";
import {CudaResource, SystemResources} from "../systemResources";

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  id: number | undefined;
  resource: Resource | undefined;
  isEditAllowed = false;
  isRemovalAllowed = false;

  @ViewChild('resourceForm') resourceForm! : NgForm;

  runningTasks = new MatTableDataSource<Task>([]);
  @ViewChild('runningTasksPaginator') runningTasksPaginator!: MatPaginator;
  @ViewChild('runningTasksTable', {read: MatSort}) runningTasksSort!: MatSort;
  displayedColumns: string[] = ['id', 'name', 'status', 'progress', 'user', 'schema', 'files', 'details'];

  systemResources!: SystemResources;
  gpus = new MatTableDataSource<CudaResource>([]);
  @ViewChild('gpusPaginator') gpusPaginator!: MatPaginator;
  @ViewChild('gpusTable', {read: MatSort}) gpusSort!: MatSort;
  gpusDisplayedColumns: string[] = ['id', 'name', 'totalMemory', 'freeMemory', 'usedMemory', 'temperature', 'utilisation'];

  isSystemResourcesLoaded = false;

  statisticYears = [2022]
  statisticMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  @ViewChild('runCaseStatisticsForm') runCaseStatisticsForm! : NgForm;
  statisticYear: number = 2022;
  statisticMonth: number = 1;

  constructor(private route: ActivatedRoute,
              private resourceService: ResourceService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.resourceService.getResource(this.id).subscribe(resource => {
      this.resource = resource;
    })

    this.resourceService.getRunningTasks(this.id).subscribe(tasks => {
      this.runningTasks = new MatTableDataSource<Task>(tasks);
      this.runningTasks.sort = this.runningTasksSort;
      this.runningTasks.paginator = this.runningTasksPaginator;
    })

    this.resourceService.getSystemResources(this.id).subscribe(systemResources => {
      this.systemResources = systemResources;
      this.gpus = new MatTableDataSource<CudaResource>(systemResources.cudaResources!);
      this.gpus.sort = this.gpusSort;
      this.gpus.paginator = this.gpusPaginator;
      this.isSystemResourcesLoaded = true;
    })
  }

  allowEdit() {
    this.isEditAllowed = true;
  }

  allowRemoval() {
    this.isRemovalAllowed = true;
  }

  deleteResource() {
    this.resourceService.deleteResource(this.id!).subscribe(message => {
      this.router.navigate(['resources']);
    })
  }

  reload() {
    window.location.reload();
  }

  editResource() {
    this.resourceService.editResources(this.id!, this.resource!).subscribe(resource => {
      this.resource = resource;
      window.location.reload()
      }
    )
  }

  goTo(id: number) {
    this.router.navigate(['task', id]);
  }

  goToFiles(id: number) {
    this.router.navigate(['storage', id]);
  }

  getRunCaseResourceStatistics() {

    this.resourceService.generateAnalyticsGrabberToken().subscribe(message => {
        let token = message.message;
        this.resourceService.getRunCaseResourceStatistics(this.id!, this.statisticYear, this.statisticMonth, token).subscribe(response => {
          //Generate file
          let file = new Blob([JSON.stringify(response)], {type: 'application/txt'})
          let a = document.createElement("a");
          let url = URL.createObjectURL(file);
          a.href = url;
          document.body.appendChild(a);
          a.download = "run-cases-r" + this.id! + "-y" + this.statisticYear + "-m" + this.statisticMonth + ".json"
          a.click();
        })
      }
    )
  }
}
