import {Component, OnInit, ViewChild} from '@angular/core';
import {SchemaCategoriesService} from "./schema-categories.service";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {SchemaCategory} from "../schemaCategory";

@Component({
  selector: 'app-schema-categories',
  templateUrl: './schema-categories.component.html',
  styleUrls: ['./schema-categories.component.css']
})
export class SchemaCategoriesComponent implements OnInit {

  @ViewChild('schemaCategoriesPaginator') schemaCategoriesPaginator!: MatPaginator;
  @ViewChild('schemaCategoriesTable', {read: MatSort}) schemaCategoriesSort!: MatSort;
  schemaCategories = new MatTableDataSource<SchemaCategory>([]);
  displayedColumns: string[] = ['id', 'name', 'details'];

  constructor(private schemaCategoriesService: SchemaCategoriesService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllSchemaCategories();
  }

  getAllSchemaCategories() {
    this.schemaCategoriesService.getAllSchemaCategories().subscribe(schemaCategories => {
      this.schemaCategories = new MatTableDataSource<SchemaCategory>(schemaCategories)
      this.schemaCategories.sort = this.schemaCategoriesSort;
      this.schemaCategories.paginator = this.schemaCategoriesPaginator;
    })
  }

  goTo(id: number) {

  }
}
