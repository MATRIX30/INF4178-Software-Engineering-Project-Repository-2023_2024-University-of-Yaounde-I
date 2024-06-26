import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home-admin-teacher',
  templateUrl: './home-admin-teacher.component.html',
  styleUrls: ['./home-admin-teacher.component.css']
})
export class HomeAdminTeacherComponent {

  displayedColumns: string[] = ['titre', 'niveau', 'chapitre', 'sujet', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}



interface PeriodicElement {
  nom: string;
 sexeage: string;
  domaine: string;
  date: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    nom: "Patricia",sexeage : "Homme-20ans", domaine: "genie-civil", date: "20/12/2023", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    
    nom: "Loic", sexeage: "Homme-20ans", domaine: "genie-civil", date: "20/12/2023", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    nom: "Emmanuel", sexeage: "Homme-20ans", domaine: "genie-civil", date: "20/12/2023", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    nom: "Sarah", sexeage: "Homme-20ans", domaine: "genie-civil",date: "20/12/2023", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    nom: "Patricia", sexeage: "Homme-20ans", domaine: "genie-civil", date: "20/12/2023", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    nom: "Loic", sexeage: "Homme-20ans", domaine: "genie-civil", date: "20/12/2023", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    nom: "Emmanuel", sexeage: "Homme-20ans", domaine: "genie-civil", date: "20/12/2023", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    nom: "Sarah", sexeage: "Homme-20ans", domaine: "genie-civil", date: "20/12/2023", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    nom: "Pat", sexeage: "Homme-20ans", domaine: "genie-civil",date: "20/12/2023", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },

];


