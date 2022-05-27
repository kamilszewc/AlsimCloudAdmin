import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ObjectGroupService} from "./object-group.service";
import {Object, ObjectGroup, ObjectUrls, Simulation} from "../object-groups/object-groups.service";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AlarmDialogMessage, AlarmDialogService} from "../alarm-dialog/alarm-dialog.service";
import {group} from "@angular/animations";
import {Myfile} from "../myfile";

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


  filePathToObjectUpload: File | undefined;
  filePathToIconUpload: File | undefined;
  filePathToThumbnailUpload: File | undefined;
  filePathToSourceUpload: File | undefined;
  @ViewChild('uploadForm') uploadForm! : NgForm;
  objectToUpload: Object = new class implements Object {
    id = null;
    name = "";
    group = null;
    description = "";
    extension = null;
    extensionIcon = null;
    extensionThumbnail = null;
    extensionSource = null;
    hasSource = null;
    hasSimulations = null;
    owner = null;
    permission = null;
    isPublic = false;
    size = null;
    checksum = null;
    creationTime = null;
    modificationTime = null;
    objectUrls = null;
    simulations = null;
  };


  constructor(private router: Router,
              private objectGroupService: ObjectGroupService,
              private route: ActivatedRoute,
              private alarmDialogService: AlarmDialogService) { }

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
    this.isEditAllowed = true;
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

  editGroup() {
    console.log(this.group);
    this.objectGroupService.generateObjectsRepositoryToken().subscribe(message => {
      // Get token
      let token = message.message;

      this.objectGroupService.editGroup(this.group, token).subscribe(
        group => {
          window.location.reload();
        },
        error => {
          const dialogMessage = new class implements AlarmDialogMessage {
            title = "Error"
            message = error.error.message
          };
          this.alarmDialogService.open(dialogMessage);
        });
    });
  }

  deleteGroup() {
    this.objectGroupService.generateObjectsRepositoryToken().subscribe(message => {
      // Get token
      let token = message.message;

      // Delete group
      this.objectGroupService.deleteGroup(this.id!, token).subscribe(
        message => {
          this.router.navigate(['object-groups'])
        },
        error => {
          const dialogMessage = new class implements AlarmDialogMessage {
            title = "Error"
            message = error.error.message
          };
          this.alarmDialogService.open(dialogMessage);
        });
    });
  }

  uploadObject() {
    console.log("Trying to upload...")

    const formData = new FormData();
    formData.append('object',  this.filePathToObjectUpload!, this.filePathToObjectUpload!.name)
    formData.append('thumbnail',  this.filePathToThumbnailUpload!, this.filePathToThumbnailUpload!.name)
    formData.append('icon',  this.filePathToIconUpload!, this.filePathToIconUpload!.name)
    if (this.filePathToSourceUpload != null) {
      formData.append('source', this.filePathToSourceUpload!, this.filePathToSourceUpload!.name)
    }

    const type = this.uploadForm.value.type;

    this.objectGroupService.generateObjectsRepositoryToken().subscribe(message => {
      // Get token
      let token = message.message;

      console.log("Getting a token... " + token)
      this.objectToUpload.group = this.id;

      this.objectGroupService.uploadObject(type, formData, this.objectToUpload, token).subscribe(
        response => {
          window.location.reload();
        },
        error => {
          const dialogMessage = new class implements AlarmDialogMessage {
            title = "Error"
            message = error.error.message
          };
          this.alarmDialogService.open(dialogMessage);
        });
    });
  }


  onObjectFileChange(event: any) {
    this.filePathToObjectUpload = event.target.files[0];
  }

  onThumbnailFileChange(event: any) {
    this.filePathToThumbnailUpload = event.target.files[0];
  }

  onIconFileChange(event: any) {
    this.filePathToIconUpload = event.target.files[0];
  }

  onSourceFileChange(event: any) {
    this.filePathToSourceUpload = event.target.files[0];
  }
}
