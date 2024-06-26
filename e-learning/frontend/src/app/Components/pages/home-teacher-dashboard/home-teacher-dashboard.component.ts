import { Component } from '@angular/core';

interface PeriodicElement {
  description: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    description: "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta", date: 'Lun. 10 Jan 2024 15:30'
  },
  {
    description: "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta", date: 'Lun. 10 Jan 2024 15:30'
  },
  {
    description: "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta", date: 'Lun. 10 Jan 2024 15:30'
  },
  {
    description: "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta", date: 'Lun. 10 Jan 2024 15:30'
  },
  {
    description: "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta", date: 'Lun. 10 Jan 2024 15:30'
  },
  {
    description: "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta", date: 'Lun. 10 Jan 2024 15:30'
  },
  {
    description: "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta", date: 'Lun. 10 Jan 2024 15:30'
  },
  {
    description: "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Volupta", date: 'Lun. 10 Jan 2024 15:30'
  },

];

@Component({
  selector: 'app-home-teacher-dashboard',
  templateUrl: './home-teacher-dashboard.component.html',
  styleUrls: ['./home-teacher-dashboard.component.css']
})
export class HomeTeacherDashboardComponent {
  displayedColumns: string[] = ['Description', 'Date'];
  dataSource = ELEMENT_DATA;
}
