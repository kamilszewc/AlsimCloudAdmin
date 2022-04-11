import {Component, HostListener, Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-alarm-dialog',
  templateUrl: './alarm-dialog.component.html',
  styleUrls: ['./alarm-dialog.component.css']
})
export class AlarmDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: string,
    message: string
  }, private mdDialogRef: MatDialogRef<AlarmDialogComponent>) { }

  @HostListener("keydown.esc")
  public onEsc() {
    console.log("XXX")
  }
}
