import { AfterViewInit, Component } from '@angular/core';
import {ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DataServiceService } from '../data-service.service';
import { Employee, ServerData } from '../types/Employee';





@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})




export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'birthDate', 'firstName','lastName','gender','hireDate', 'deleteRow'];
  data : any;
  dataSources = new MatTableDataSource<Employee>();
  @ViewChild(MatTable)
  table!: MatTable<Employee>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  Current : any;


  ngAfterViewInit() {
    this.dataSources.paginator = this.paginator;
  }

  constructor(private restClient:DataServiceService)
  {
    this.loadData("http://localhost:8080/employees");
    this.dataSources = new MatTableDataSource(this.data?._embedded.employees);
  }

  
  loadData(url : string)
  {
    this.restClient.getDataRows(url).subscribe(
      serverResponse => {
        this.data = serverResponse;
        this.dataSources.data = this.data._embedded.employees;
        this.Current = url;
      }
    )

  }



  nextPage(){
    if(this.data) this.loadData(this.data._links.next.href);
  }
  prevPage(){
    if(this.data) this.loadData(this.data._links.prev.href);
  }
  firstPage(){
    if(this.data) this.loadData(this.data._links.first.href);
  }
  lastPage(){
    if(this.data) this.loadData(this.data._links.last.href);
  }
  deleteRow(index : number){
    this.restClient.remove(index).subscribe(()=> {
      this.loadData(this.Current);
    });
    
  }
  /*editRow(index : number){

  }*/
}




