import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PdfService } from 'src/app/Services/Pdf/pdf.service';
import { SuiviCoursService } from 'src/app/Services/SuiviCours/suivi-cours.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent {

  constructor(
    private _pdfService: PdfService,
    private _router: Router,
    private _suivicoursService: SuiviCoursService

  ) { }
  @Input() course!: any | null;
  @Input() state!: string | null;

  ngOnInit() { }

  go_to_certificate() {
    this._pdfService.cours = this.course;
    const url = 'http://localhost:4200/certificat';
    window.open(url, '_blank');
  }

  go_to_detail_page() {
    this._suivicoursService.selectedcourse = this.course;
    localStorage.setItem('selectedCourse', this.course + '');
    this._router.navigateByUrl('cours-detail');
  }
}
