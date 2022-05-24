import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Solver, SolversService} from "./solvers.service";
import {AlarmDialogMessage, AlarmDialogService} from "../alarm-dialog/alarm-dialog.service";

@Component({
  selector: 'app-solvers',
  templateUrl: './solvers.component.html',
  styleUrls: ['./solvers.component.css']
})
export class SolversComponent implements OnInit {

  solvers!: Solver[]
  isLoading = true;

  constructor(private router: Router,
              private solversService: SolversService,
              private route: ActivatedRoute,
              private alarmDialogService: AlarmDialogService) { }

  ngOnInit(): void {
    this.getSolvers();
  }

  getSolvers() {
    this.solversService.generateSolversRepositoryToken().subscribe(message => {
      // Get token
      let token = message.message;

      // Get input files
      this.solversService.getSolvers(token).subscribe(solvers => {
        this.solvers = solvers;
        this.isLoading = false;
      })
    })
  }

  removeVersion(solver: string, version: string) {
    this.solversService.generateSolversRepositoryToken().subscribe(message => {
      // Get token
      let token = message.message;

      // Get input files
      this.solversService.removeVersion(solver, version, token).subscribe(message => {
        this.getSolvers()
        const dialogMessage = new class implements AlarmDialogMessage {
          title = "Information"
          message = "Version " + version + " of solver " + solver + " removed"
        };
        this.alarmDialogService.open(dialogMessage);
      })
    })
  }

}
