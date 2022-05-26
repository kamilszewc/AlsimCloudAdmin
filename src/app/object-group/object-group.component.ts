import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ObjectGroupService} from "./object-group.service";
import {Object, ObjectGroup} from "../object-groups/object-groups.service";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-object-group',
  templateUrl: './object-group.component.html',
  styleUrls: ['./object-group.component.css']
})
export class ObjectGroupComponent implements OnInit {

  id!: string | null;
  group!: ObjectGroup;

  @ViewChild('groupForm') groupForm! : NgForm;
  isEditAllowed = false;

  objects = new MatTableDataSource<Object>([]);
  @ViewChild('objectsPaginator') objectsPaginator!: MatPaginator;
  @ViewChild('objectsTable', {read: MatSort}) objectsSort!: MatSort;
  displayedColumns: string[] = ['id', 'name', 'size', 'isPublic', 'hasSource', 'hasSimulation', 'details'];
  isRemovalAllowed = false;

  constructor(private router: Router,
              private objectGroupService: ObjectGroupService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.objectGroupService.generateObjectsRepositoryToken().subscribe(message => {
      // Get token
      let token = message.message;

      // Get group information
      this.objectGroupService.getGroup(this.id!, token).subscribe(group => {
        this.group = group;
      })

      // Get all group objects
      this.objectGroupService.getObjects(this.id!, token).subscribe(objects => {
        this.objects = new MatTableDataSource<Object>(objects)
        this.objects.paginator = this.objectsPaginator
        this.objects.sort = this.objectsSort;
        console.log(objects)
      })
    });

  }

  allowEdit() {

  }

  editGroup() {

  }

  reload() {
    window.location.reload();
  }

  goTo(id: string) {
    this.router.navigate(['object', id])
  }

  allowRemoval() {
    this.isRemovalAllowed = true;
  }

  deleteGroup() {

  }
}
