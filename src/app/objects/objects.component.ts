import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../storage/storage.service";
import {ObjectsService} from "./objects.service";
import {MatTableDataSource} from "@angular/material/table";
import {StorageFile} from "../storageFile";

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit {

  constructor(private router: Router,
              private objectsService: ObjectsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getGroups()
  }

  getGroups() {
    this.objectsService.generateObjectsRepositoryToken().subscribe(message => {
      // Get token
      let token = message.message;

      this.objectsService.getGroups(token).subscribe(groups => {
        // this.inputFiles = new MatTableDataSource<StorageFile>(files);
        // this.inputFiles.paginator = this.inputFilesPaginator;
        // this.inputFiles.sort = this.inputFilesSort;
        console.log(groups)
      });
    });
  }

}
