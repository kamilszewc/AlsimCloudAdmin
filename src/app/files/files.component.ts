import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FilesService} from "./files.service";
import {File} from "../file"
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {GlobalConstants} from "../common/global-constants";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  @ViewChild('downloadFilesPaginator') downloadFilesPaginator!: MatPaginator;
  @ViewChild('downloadFilesTable', {read: MatSort}) downloadFilesSort!: MatSort;
  downloadFiles = new MatTableDataSource<File>([]);

  @ViewChild('schemaIconFilesPaginator') schemaIconFilesPaginator!: MatPaginator;
  @ViewChild('schemaIconFilesTable', {read: MatSort}) schemaIconFilesSort!: MatSort;
  schemaIconFiles = new MatTableDataSource<File>([]);

  @ViewChild('schemaCategoryIconFilesPaginator') schemaCategoryIconFilesPaginator!: MatPaginator;
  @ViewChild('schemaCategoryIconFilesTable', {read: MatSort}) schemaCategoryIconFilesSort!: MatSort;
  schemaCategoryIconFiles = new MatTableDataSource<File>([]);

  @ViewChild('imageFilesPaginator') imageFilesPaginator!: MatPaginator;
  @ViewChild('imageFilesTable', {read: MatSort}) imageFilesSort!: MatSort;
  imageFiles = new MatTableDataSource<File>([]);

  displayedColumns: string[] = ['id', 'name', 'download', 'details', 'remove'];

  fileTypes: string[] = ['IMAGE', 'DOWNLOAD', 'SCHEMA_ICON', 'SCHEMA_CATEGORY_ICON']

  fileToUpload!: File;
  @ViewChild('uploadForm') uploadForm! : NgForm;

  apiUrl: string;

  constructor(private router: Router,
              private filesService: FilesService) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  ngOnInit(): void {
    this.getDownloadFiles()
    this.getSchemaIconFiles()
    this.getSchemaCategoryIconFiles()
    this.getImageFiles()
  }

  getDownloadFiles() {
    this.filesService.getAllFilesOfType("DOWNLOAD")
      .subscribe(files => {
        this.downloadFiles = new MatTableDataSource<File>(files)
        this.downloadFiles.sort = this.downloadFilesSort;
        this.downloadFiles.paginator = this.downloadFilesPaginator;
      })
  }

  getSchemaIconFiles() {
    this.filesService.getAllFilesOfType("SCHEMA_ICON")
      .subscribe(files => {
        this.schemaIconFiles = new MatTableDataSource<File>(files)
        this.schemaIconFiles.sort = this.schemaIconFilesSort;
        this.schemaIconFiles.paginator = this.schemaIconFilesPaginator;
      })
  }

  getSchemaCategoryIconFiles() {
    this.filesService.getAllFilesOfType("SCHEMA_CATEGORY_ICON")
      .subscribe(files => {
        this.schemaCategoryIconFiles = new MatTableDataSource<File>(files)
        this.schemaCategoryIconFiles.sort = this.schemaCategoryIconFilesSort;
        this.schemaCategoryIconFiles.paginator = this.schemaCategoryIconFilesPaginator;
      })
  }

  getImageFiles() {
    this.filesService.getAllFilesOfType("IMAGE")
      .subscribe(files => {
        this.imageFiles = new MatTableDataSource<File>(files)
        this.imageFiles.sort = this.imageFilesSort;
        this.imageFiles.paginator = this.imageFilesPaginator;
      })
  }

  deleteFile(id: number) {
    this.filesService.deleteFile(id).subscribe();
  }

  goTo(id: number) {
    this.router.navigate(['file', id])
  }

  uploadFile() {
  }
}
