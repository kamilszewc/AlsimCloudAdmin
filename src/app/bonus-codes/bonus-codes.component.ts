import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {AlarmDialogMessage, AlarmDialogService} from "../alarm-dialog/alarm-dialog.service";
import {BonusCodesService} from "./bonus-codes.service";
import {BonusCode} from "./bonus-code";
import {interval} from "rxjs";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-bonus-codes',
  templateUrl: './bonus-codes.component.html',
  styleUrls: ['./bonus-codes.component.css']
})
export class BonusCodesComponent implements OnInit {

  @ViewChild('bonusCodesPaginator') bonusCodesPaginator!: MatPaginator;
  @ViewChild('bonusCodesTable', {read: MatSort}) bonusCodesSort!: MatSort;
  bonusCodes = new MatTableDataSource<BonusCode>([]);
  isLoading = true;
  displayedColumns: string[] = ['id', 'numberOfTokens', 'numberOfDays', 'expirationTime', 'isUsed', 'createDateTime', 'remove'];

  @ViewChild('newBonusCodeForm') newBonusCodeForm!: NgForm;
  newBonusCode: BonusCode = new class implements BonusCode {
    id: string | null = null
    createDateTime: string | null = null;
    expirationTime: string | null = null;
    isUsed: boolean | null = null;
    numberOfDays: number | null = 0;
    numberOfTokens: number | null = 0;
    validityDays: number | null = 0;
  }

  constructor(private bonusCodesService: BonusCodesService,
              private router: Router,
              private alarmDialogService: AlarmDialogService) { }

  ngOnInit(): void {
    this.getBonusCodes();
    interval(60000).subscribe(value => {
      this.getBonusCodes();
    });
  }

  getBonusCodes() {
    this.bonusCodesService.getBonusCodes()
      .subscribe(bonusCodes => {
        this.bonusCodes = new MatTableDataSource<BonusCode>(bonusCodes)
        this.bonusCodes.sort = this.bonusCodesSort;
        this.bonusCodes.paginator = this.bonusCodesPaginator;
        this.isLoading = false;
      })
  }

  addNewBonusCode() {
    console.log(this.newBonusCode)
    this.bonusCodesService.createBonusCodes(this.newBonusCode).subscribe(
      bonusCode => {
        window.location.reload();
      },
      error => {
        const dialogMessage = new class implements AlarmDialogMessage {
          title = "Error"
          message = error.error.message
        };
        this.alarmDialogService.open(dialogMessage);
      }
    )
  }

  removeBonusCode(id: string) {
      this.bonusCodesService.deleteBonusCode(id!).subscribe(
        message => {
          this.getBonusCodes();
        },
        error => {
          const dialogMessage = new class implements AlarmDialogMessage {
            title = "Error"
            message = error.error.message
          };
          this.alarmDialogService.open(dialogMessage);
        }
      )
    }
}
