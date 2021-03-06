

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { groupBy } from 'lodash'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/component/confirmation-dialog.component';
import { Router } from '@angular/router';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  x: string;
  y: string,
  z: string;
  color?: string;
}
type Day = 1 | 2 | 3 | 4 | 5 | 6


export interface Data {
  id: number;
  day: Day;
  startTime: string;
  name: string;
  link: string;
}

let ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', x: '3fvdcfds', y: '2', z: '3', color: '#CDC9FC' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', x: '3', y: '2', z: '3', },

  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', x: '3', y: '2', z: '3' },


  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


type TableData = Record<string, {
  name: string
  color?: string
  link: string
} | undefined>

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  dataSchool: TableData[] = [];


  constructor(private http: HttpClient,
    public dialog: MatDialog,
    private router :Router) { }

  ngOnInit(): void {
    this.http.get<Data[]>('http://localhost:5000/api/v1/classes').subscribe(res => {
      const times = ['08:00', '09:00', '10:00', '11:00']
      const days = [1, 2, 3, 4, 5, 6]
      const tableData: TableData[] = times.map(
        time => Object.fromEntries(days.map(
          day => [day, res.find(c => c.day === day && c.startTime === time
        )])
      ))
      this.dataSchool = tableData
      // @ts-ignore
      this.dataSchool[1][1].color = '#CDC9FC';
    })
  }

  displayedColumns: string[] = ['name', 'weight', 'symbol', 'x', 'y', 'z'];
  dataSource = [...this.dataSchool];

  @ViewChild(MatTable) table: MatTable<PeriodicElement> | undefined;

  openDialog() {
    const dialogRef= this.dialog.open(ConfirmationDialogComponent, {
      panelClass: 'alert-manager-dialog',
      data: {
        title: '???????? ????????, ???????? ???????? ???????????? ???????????? ??????????',
        message:
          `<div class= "equipment">
      :???????? ?????????? ?????? ??????        </div>
        <div>
          ??????????*        <br>
          ????????*        <br>
          ????????????*        </div>
        `,
        buttonText: '?????? ???????? ????????????',
      },
    });
    // const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   this.router.navigate(['https://us04web.zoom.us/wc/join/76142668407?pwd=0BVCyfuzugiX_MMQRBRAC-hT3hCUii.1'])
    //   console.log(`Dialog result: ${result}`);
    // });
  }

 

  


}

