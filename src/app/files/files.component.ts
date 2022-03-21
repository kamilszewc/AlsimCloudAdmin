import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FilesService} from "./files.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  @ViewChild('downloadFilesPaginator') downloadFilesPaginator!: MatPaginator;
  @ViewChild('downloadFilesTable', {read: MatSort}) downloadFilesSort!: MatSort;
  downloadFiles = new MatTableDataSource<File>([]);

  @ViewChild('iconFilesPaginator') iconFilesPaginator!: MatPaginator;
  @ViewChild('iconFilesTable', {read: MatSort}) iconFilesSort!: MatSort;
  iconFiles = new MatTableDataSource<File>([]);

  displayedColumns: string[] = ['id', 'name', 'url'];

  constructor(private router: Router,
              private filesService: FilesService) { }

  ngOnInit(): void {
    this.getDownloadFiles()
    this.getIconFiles()
  }

  getDownloadFiles() {
    this.filesService.getAllFilesOfType("DOWNLOAD")
      .subscribe(files => {
        this.downloadFiles = new MatTableDataSource<File>(files)
        this.downloadFiles.sort = this.downloadFilesSort;
        this.downloadFiles.paginator = this.downloadFilesPaginator;
      })
  }

  getIconFiles() {
    this.filesService.getAllFilesOfType("ICON")
      .subscribe(files => {
        this.iconFiles = new MatTableDataSource<File>(files)
        this.iconFiles.sort = this.iconFilesSort;
        this.iconFiles.paginator = this.iconFilesPaginator;
      })
  }

  deleteFile(id: number) {
    // TODO
  }

}
