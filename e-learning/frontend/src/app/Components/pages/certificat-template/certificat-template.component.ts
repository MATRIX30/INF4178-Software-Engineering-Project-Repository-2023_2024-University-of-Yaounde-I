import { Component } from '@angular/core';
import { DateTime } from 'src/app/Models/datetime.interface';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { DatetimeService } from 'src/app/Services/Datetime/datetime.service';
import { LoaderService } from 'src/app/Services/Loader/loader.service';
import { PdfService } from 'src/app/Services/Pdf/pdf.service';

@Component({
  selector: 'app-certificat-template',
  templateUrl: './certificat-template.component.html',
  styleUrls: ['./certificat-template.component.css']
})
export class CertificatTemplateComponent {

  constructor(
    protected _pdfService: PdfService,
    protected _authService: AuthService,
    private _datetimeService: DatetimeService
  ) { }

  d: Date = new Date();
  dateStr = this._datetimeService.formatDate(this.d).date;

  printCertificat() {
    window.print();
  }

  ngOnInit() {
    let userString = sessionStorage.getItem('user');
    if (userString) {
      this._authService.user = JSON.parse(userString);
      console.log(this._authService.user);

      document.body.style.cursor = 'progress';
      setTimeout(() => {
        document.body.style.cursor = 'default';
        this.printCertificat();
      }, 3000);
    }

  }

}
