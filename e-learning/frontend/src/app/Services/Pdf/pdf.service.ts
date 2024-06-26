import { Injectable, ElementRef } from '@angular/core';
import * as jspdf from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  cours: any;
}
