import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Group} from "../group";
import {GroupService} from "./group.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  group!: Group;
  isEditAllowed = false;

  constructor(private route: ActivatedRoute,
              private groupService: GroupService) { }

  ngOnInit(): void {
  }

  getGroup(id: number) {
    this.groupService.getGroup(id).subscribe(group => {
      this.group = group;
    })
  }

  allowEdit() {
    this.isEditAllowed = true;
  }

  blockEdit() {
    this.isEditAllowed = false;
  }

  editGroup() {

  }

  reload() {
    window.location.reload();
  }
}
