import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SchemaService} from "./schema.service";
import {User} from "../user";
import {Schema} from "../schema";
import {NgForm} from "@angular/forms";
import {SchemaCategory} from "../schemaCategory";
import {AlarmDialogMessage, AlarmDialogService} from "../alarm-dialog/alarm-dialog.service";

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css']
})
export class SchemaComponent implements OnInit {

  id: number | undefined;
  schema!: Schema;
  isEditAllowed = false;
  isRemovalAllowed = false;
  paymentMethods: string[] | undefined;

  schemaCategories!: SchemaCategory[]

  @ViewChild('schemaForm') schemaForm! : NgForm;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private schemaService: SchemaService,
              private alarmDialogService: AlarmDialogService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.schemaService.getSchema(this.id).subscribe(schema => {
      this.schema = schema;
      this.schema.schemaCategoryId = schema.schemaCategory!.id
    })

    this.schemaService.getPaymentMethods().subscribe(paymentMethods => {
      this.paymentMethods = paymentMethods;
    })

    this.getAllSchemaCategories()
  }

  allowEdit() {
    this.isEditAllowed = true;
  }

  allowRemoval() {
    this.isRemovalAllowed = true;
  }

  blockEdit() {
    this.isEditAllowed = false;
  }

  editSchema() {
    let schemaToSubmit = this.schema
    console.log(schemaToSubmit)
    if (schemaToSubmit.ownersGitlabId == null) schemaToSubmit.ownersGitlabId = -1
    this.schemaService.editSchema(this.id!, this.schema!).subscribe(
      schema => {
        this.schema = schema;
        this.schema.schemaCategoryId = schema.schemaCategory!.id
        this.blockEdit();
      },
      error => {
        const dialogMessage = new class implements AlarmDialogMessage {
          title = "Error"
          message = error.error.message
        };
        this.alarmDialogService.open(dialogMessage);
      })
  }

  reload() {
    window.location.reload();
  }

  deleteSchema() {
    this.schemaService.removeSchema(this.id!).subscribe(message => {
      this.router.navigate(['schemas'])
    })
  }

  getAllSchemaCategories() {
    this.schemaService.getAllSchemaCategories().subscribe(schemaCategories => {
      this.schemaCategories = schemaCategories
    })
  }

}
