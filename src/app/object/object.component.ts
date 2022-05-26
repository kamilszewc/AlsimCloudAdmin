import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ObjectService} from "./object.service";
import {Object} from "../object-groups/object-groups.service";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {GlobalConstants} from "../common/global-constants";

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {

  apiUrl: string;
  token!: string;
  id!: string | null;
  object!: Object;
  @ViewChild('objectForm') objectForm! : NgForm;
  isEditAllowed = false;
  isRemovalAllowed = false;

  constructor(private router: Router,
              private objectService: ObjectService,
              private route: ActivatedRoute) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.objectService.generateObjectsRepositoryToken().subscribe(message => {
      // Get token
      this.token = message.message;

      // Get object information
      this.objectService.getObject(this.id!, this.token).subscribe(object => {
        this.object = object;
        console.log(this.object)
      })
    });
  }


  allowEdit() {

  }

  editObject() {

  }

  reload() {
    window.location.reload();
  }

  removeSimulation(objectId: string, simulationId: string) {

  }

  allowRemoval() {
    this.isRemovalAllowed = true;
  }

  deleteObject() {

  }
}
