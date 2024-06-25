import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PdfService } from 'src/app/Services/Pdf/pdf.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent {

  constructor(
    private _pdfService: PdfService,
    private _router: Router

  ) { }
  @Input() course!: any | null;
  @Input() state!: string | null;

  ngOnInit() { }

  go_to_certificate() {
    this._pdfService.cours = this.course;
    const url = 'http://localhost:4200/certificat';
    window.open(url, '_blank');
  }
}
