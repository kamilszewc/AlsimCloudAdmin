import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Group} from "../group";
import {GroupService} from "./group.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  id!: number;
  group!: Group;
  isEditAllowed = false;
  isRemovalAllowed = false;

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.groupService.getGroup(this.id).subscribe(group => {
      this.group = group;
    })
  }

  getGroup(id: number) {
    this.groupService.getGroup(id).subscribe(group => {
      this.group = group;
    })
  }

  removeGroup() {
    this.groupService.removeGroup(this.id).subscribe(response => {
      this.router.navigate(['groups'])
    })
  }

  allowRemoval() {
    this.isRemovalAllowed = true;
  }

  blockRemoval() {
    this.isRemovalAllowed = false;
  }

  allowEdit() {
    this.isEditAllowed = true;
  }

  blockEdit() {
    this.isEditAllowed = false;
  }

  editGroup() {
    this.groupService.editGroup(this.id, this.group).subscribe(group => {
      //this.group = group;
      window.location.reload();
    })
  }

  reload() {
    window.location.reload();
  }
}
