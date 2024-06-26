import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home-admin-dashboard',
  templateUrl: './home-admin-dashboard.component.html',
  styleUrls: ['./home-admin-dashboard.component.css']
})
export class HomeAdminDashboardComponent {

  displayedColumns: string[] = ['description', 'date'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}



interface PeriodicElement {
  date: string;
  
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    date: "20/03/2023",  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta volupta volupta volupta" 
  },
  {
    date: "20/03/2023",  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta volupta volupta volupta"
  },
  {
    date: "20/03/2023",  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta volupta volupta volupta"
  },
  {
    date: "20/03/2023",description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta volupta volupta volupta"
  },
  {
    date: "20/03/2023",  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta volupta volupta volupta"
  },
  {
    date: "20/03/2023", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta volupta volupta volupta"
  },
  {
    date: "20/03/2023",  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta volupta volupta volupta"
  },
  {
    date: "20/03/2023",  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta volupta volupta volupta"
  },
  {
    date: "20/03/2023",  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta volupta volupta volupta"
  },

];



