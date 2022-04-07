import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {SchemasService} from "./schemas.service";
import {Schema} from "../schema";
import {Resource} from "../resource";
import {NgForm} from "@angular/forms";
import {Myfile} from "../myfile";
import {SchemaCategory} from "../schemaCategory";

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

  @ViewChild('newSchemaForm') newSchemaForm! : NgForm;
  paymentMethods: string[] | undefined;
  newSchema: Schema = new class implements Schema {
    assessmentKeys: string | null = ""
    banner: Myfile | null = null;
    commandTemplate: string | null = "";
    description: string | null = "";
    icon: Myfile | null = null;
    id: number | null = null;
    latestSolverVersion: string | null = "";
    minNumberOfCpus: number | null = 1;
    minNumberOfGpus: number | null = 0;
    minRamMemory: number | null = 0;
    name: string | null = "";
    ownersGitlabId: number | null = null;
    paymentMethod: string | null = 'CONTACT';
    schemaCategory: SchemaCategory | null = null;
    solverGroup: string | null = "";
    usesMlModel: boolean | null = false;
    validationKeys: string | null = "";
    filesToNotRemoveDuringRuntime: string | null = "";
    filesToNotUpload: string | null = "";
    additionalFoldersToUpload: string | null = "";
  }

  constructor(private schemasService: SchemasService,
              private router: Router) { }

  ngOnInit(): void {
    this.getSchemas()

    this.schemasService.getPaymentMethods().subscribe(paymentMethods => {
      this.paymentMethods = paymentMethods;
    })
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

  addNewSchema() {
    this.schemasService.addNewSchema(this.newSchema!).subscribe(schema => {
      this.router.navigate(['schema', schema.id])
    })
  }

}
