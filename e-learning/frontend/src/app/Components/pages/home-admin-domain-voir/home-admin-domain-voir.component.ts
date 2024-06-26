import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home-admin-domain-voir',
  templateUrl: './home-admin-domain-voir.component.html',
  styleUrls: ['./home-admin-domain-voir.component.css']
})
export class HomeAdminDomainVoirComponent {
  displayedColumns: string[] = ['titre', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}



interface PeriodicElement {
  titre: string;
  
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    titre: "Informatique",  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "Informatique",  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "Informatique",  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "Informatique",description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "Informatique",  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "Informatique", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "Informatique",  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "Informatique",  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "Informatique",  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },

];


