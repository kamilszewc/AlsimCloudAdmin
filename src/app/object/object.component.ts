import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ObjectService} from "./object.service";
import {Object, Simulation} from "../object-groups/object-groups.service";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {GlobalConstants} from "../common/global-constants";
import {AlarmDialogMessage, AlarmDialogService} from "../alarm-dialog/alarm-dialog.service";

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

  filePathToSimulationUpload: File | undefined;
  @ViewChild('simulationUploadForm') simulationUploadForm! : NgForm;
  simulationToUpload: Simulation = new class implements Simulation {
    id = null;
    time = 0.0;
    size = null;
    checksum = null;
    creationTime = null;
    modificationTime = null;
    url = null;
  };

  constructor(private router: Router,
              private objectService: ObjectService,
              private route: ActivatedRoute,
              private alarmDialogService: AlarmDialogService) {
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
    this.isEditAllowed = true;
  }

  editObject() {
    this.objectService.generateObjectsRepositoryToken().subscribe(message => {
      // Get token
      let token = message.message;

      this.objectService.editObject(this.object, token).subscribe(
        object => {
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

  reload() {
    window.location.reload();
  }


  allowRemoval() {
    this.isRemovalAllowed = true;
  }

  deleteObject() {
    this.objectService.generateObjectsRepositoryToken().subscribe(message => {
      // Get token
      this.token = message.message;

      // Get object information
      this.objectService.deleteObject(this.id!, this.token).subscribe(
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

  removeSimulation(time: number) {
    this.objectService.generateObjectsRepositoryToken().subscribe(message => {
      // Get token
      let token = message.message;

      this.objectService.deleteSimulation(this.id!, time, token).subscribe(
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

  onSimulationFileChange(event: any) {
    this.filePathToSimulationUpload = event.target.files[0];
  }

  uploadSimulation() {
    console.log("Trying to upload simulation...")

    const formData = new FormData();
    formData.append('simulation',  this.filePathToSimulationUpload!, this.filePathToSimulationUpload!.name)


    const type = this.simulationUploadForm.value.type;

    this.objectService.generateObjectsRepositoryToken().subscribe(message => {
      // Get token
      let token = message.message;

      console.log("Getting a token... " + token)

      this.objectService.uploadSimulation(this.id!, type, formData, this.simulationToUpload.time, token).subscribe(
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
}
