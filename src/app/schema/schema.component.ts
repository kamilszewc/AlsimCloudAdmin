import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SchemaService} from "./schema.service";
import {User} from "../user";
import {Schema} from "../schema";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css']
})
export class SchemaComponent implements OnInit {

  id: number | undefined;
  schema: Schema | undefined;
  isEditAllowed = false;
  isRemovalAllowed = false;
  paymentMethods: string[] | undefined;

  @ViewChild('schemaForm') schemaForm! : NgForm;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private schemaService: SchemaService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.schemaService.getSchema(this.id).subscribe(schema => {
      this.schema = schema;
    })

    this.schemaService.getPaymentMethods().subscribe(paymentMethods => {
      this.paymentMethods = paymentMethods;
    })
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
    this.schemaService.editSchema(this.id!, this.schema!).subscribe(schema => {
      this.schema = schema;
      this.blockEdit();
    })
  }

  reload() {
    window.location.reload();
  }

  deleteSchema() {

  }

}
