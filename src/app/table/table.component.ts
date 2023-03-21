import { AfterViewInit, Component } from '@angular/core';
import {ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DataServiceService } from '../data-service.service';

export interface dati {
  id: any;
  birthDate: any;
  firstName: any;
  lastName: any;
  gender: any;
  hireDate : any;
}
export interface risposta{
  _embedded: embedded;
  _links: links;
  page:any;
}
export interface links{
  self:Link;
  first:Link;
  prev:Link;
  next:Link;
  last:Link;
  profile:Link;
}
export interface embedded{
  employees:[dati];
}
export interface Link
{
  href: string;
}



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})




export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'birthDate', 'firstName','lastName','gender','hireDate'];


  @ViewChild(MatTable)
  table!: MatTable<risposta>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  ngAfterViewInit() {
    this.data.paginator = this.paginator;
  }

  constructor(private restClient:DataServiceService)
  {
    this.loadData();
  }

  data : any;
  error : any;

  loadData(): void
  {
    this.restClient.getDataRows("http://localhost:8080/employees").subscribe
    (
      data => this.data = data._embedded.employees,
    )
  }

}




