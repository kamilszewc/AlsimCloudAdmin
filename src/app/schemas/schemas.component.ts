import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {SchemasService} from "./schemas.service";
import {Schema} from "../schema";
import {Resource} from "../resource";

@Component({
  selector: 'app-schemas',
  templateUrl: './schemas.component.html',
  styleUrls: ['./schemas.component.css']
})
export class SchemasComponent implements OnInit {

  @ViewChild('schemasPaginator') schemasPaginator!: MatPaginator;
  @ViewChild('schemasTable', {read: MatSort}) schemasSort!: MatSort;
  schemas = new MatTableDataSource<Schema>([]);

  displayedColumns: string[] = ['id', 'name', 'solverGroup', 'latestSolverVersion', 'paymentMethod', 'details'];

  constructor(private schemasService: SchemasService,
              private router: Router) { }

  ngOnInit(): void {
    this.getSchemas()
  }

  getSchemas() {
    this.schemasService.getSchemas()
      .subscribe(schemas => {
        console.log(schemas)
        this.schemas = new MatTableDataSource<Schema>(schemas)
        this.schemas.sort = this.schemasSort;
        this.schemas.paginator = this.schemasPaginator;
      })
  }

  goTo(id: number) {
    this.router.navigate(['schema', id])
  }

}
