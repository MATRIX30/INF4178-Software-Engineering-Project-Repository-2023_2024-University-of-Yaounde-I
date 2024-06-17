import { Component } from '@angular/core';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { NotifierService } from 'angular-notifier';
import { CoursService } from 'src/app/Services/Cours/cours.service';
import { DomainService } from 'src/app/Services/Domain/domain.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {

  constructor(
    protected _coursService: CoursService,
    protected _domainService: DomainService,
    private _notifierService: NotifierService,
  ) { }


  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  getCours() {
    this._coursService.getAll().subscribe(response => {
      if (response.data.errors != undefined) {
        this._notifierService.notify('error', 'Une erreur est survenue');
        console.log(response.message);

      } else {
        this._coursService.coursList = JSON.parse(response.data + '');
      }
    });
  }

  ngOnInit() {
    // get all cours 
    this.getCours();
  }

}
