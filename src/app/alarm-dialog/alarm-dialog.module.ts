import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {AlarmDialogComponent} from "./alarm-dialog.component";
import {AlarmDialogService} from "./alarm-dialog.service";


@NgModule({
  declarations: [
    AlarmDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [AlarmDialogComponent],
  entryComponents: [AlarmDialogComponent],
  providers: [AlarmDialogService]
})
export class AlarmDialogModule { }
