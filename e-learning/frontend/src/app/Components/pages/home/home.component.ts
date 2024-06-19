import { HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Site } from 'src/app/Models/site.interface';
import { Ville } from 'src/app/Models/ville.interface';
import { CoursService } from 'src/app/Services/Cours/cours.service';
import { DomainService } from 'src/app/Services/Domain/domain.service';
import { LoaderService } from 'src/app/Services/Loader/loader.service';
import { PdfService } from 'src/app/Services/Pdf/pdf.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private _notifierService: NotifierService,
    protected _loaderService: LoaderService,
    private _router: Router,
    private _matDialog: MatDialog,
    protected _coursService: CoursService,
    protected _domainService: DomainService,
    private _pdfService: PdfService
  ) { }

  @ViewChild('content') content!: ElementRef;

  // Matcher
  matcher = new ErrorStateMatcher();

  getCours() {
    this._coursService.getAll().subscribe(response => {
      // log response
      console.log(response);

      if (response.data.errors != undefined) {
        this._notifierService.notify('error', 'Une erreur est survenue');
      } else {
        this._coursService.coursList = JSON.parse(response.data + '');
      }
    });
  }

  getDomains() {
    this._domainService.getAll().subscribe(response => {
      if (response.data.errors != undefined) {
        this._notifierService.notify('error', 'Une erreur est survenue');
        console.log(response);

      } else {
        this._domainService.domaineList = JSON.parse(response.data + '');
      }

      // log response
      console.log(response);
    });
  }

  ngOnInit() {
    // get domain
    this.getDomains();

    // this._pdfService.makePdf(this.content);

    // get cours
    this.getCours();

  }

}
