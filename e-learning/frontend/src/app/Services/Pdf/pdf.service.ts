import { Injectable, ElementRef } from '@angular/core';
import * as jspdf from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  makePdf(content: ElementRef) {
    // @ts-ignore
    let doc = new jsPDF();
    doc.addHTML(content.nativeElement, function () {
      doc.save('test.pdf');
    });
  }
}
