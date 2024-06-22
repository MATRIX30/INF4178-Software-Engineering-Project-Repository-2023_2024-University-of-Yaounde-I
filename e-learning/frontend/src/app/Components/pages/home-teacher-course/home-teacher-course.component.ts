import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home-teacher-course',
  templateUrl: './home-teacher-course.component.html',
  styleUrls: ['./home-teacher-course.component.css']
})
export class HomeTeacherCourseComponent {
  displayedColumns: string[] = ['titre', 'niveau', 'chapitre', 'sujet', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}



interface PeriodicElement {
  titre: string;
  niveau: string;
  chapitres: number;
  sujet: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },
  {
    titre: "UI/UX Design", niveau: "Débutant", chapitres: 5, sujet: "Design", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta"
  },

];
