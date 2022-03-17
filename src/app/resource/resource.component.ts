import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ResourceService} from "./resource.service";
import {Resource} from "../resource";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NgForm} from "@angular/forms";
import {User} from "../user";

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  id: number | undefined;
  resource: Resource | undefined;
  isEditAllowed = false;

  @ViewChild('resourceForm') resourceForm! : NgForm;

  constructor(private route: ActivatedRoute,
              private resourceService: ResourceService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.resourceService.getResource(this.id).subscribe(resource => {
      this.resource = resource;
    })
  }

  allowEdit() {
    this.isEditAllowed = true;
  }

  reload() {
    window.location.reload();
  }

  editResource() {

  }
}
