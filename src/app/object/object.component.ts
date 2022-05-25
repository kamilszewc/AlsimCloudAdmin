import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ObjectService} from "./object.service";
import {Object} from "../object-groups/object-groups.service";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {

  id!: string | null;
  object!: Object;
  @ViewChild('objectForm') objectForm! : NgForm;
  isEditAllowed = false;

  constructor(private router: Router,
              private objectService: ObjectService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.objectService.generateObjectsRepositoryToken().subscribe(message => {
      // Get token
      let token = message.message;

      // Get object information
      this.objectService.getObject(this.id!, token).subscribe(object => {
        this.object = object;
      })
    });
  }


  allowEdit() {

  }

  editObject() {

  }

  reload() {

  }
}
