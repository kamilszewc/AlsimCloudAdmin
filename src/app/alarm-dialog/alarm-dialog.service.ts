import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {map, take} from "rxjs/operators";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AlarmDialogComponent} from "./alarm-dialog.component";

export interface AlarmDialogMessage {
  title: string,
  message: string;
}

@Injectable()
export class AlarmDialogService {

  constructor(private dialog: MatDialog) { }

  dialogRef: MatDialogRef<AlarmDialogComponent> | undefined;

  public open(options: AlarmDialogMessage) {
    this.dialogRef = this.dialog.open(AlarmDialogComponent, {
      data: {
        title: options.title,
        message: options.message
      }
    })
  }

  public confirmed(): Observable<any> {
    return this.dialogRef!.afterClosed().pipe(take(1), map( res => {
      return res;
    }) )
  }
}
