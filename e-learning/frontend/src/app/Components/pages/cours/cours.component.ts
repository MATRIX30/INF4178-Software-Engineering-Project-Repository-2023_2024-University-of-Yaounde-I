import { Component } from '@angular/core';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { NotifierService } from 'angular-notifier';
import { CoursService } from 'src/app/Services/Cours/cours.service';
import { DomainService } from 'src/app/Services/Domain/domain.service';
import { LoaderService } from 'src/app/Services/Loader/loader.service';
import { SujetService } from 'src/app/Services/Sujet/sujet.service';

interface cours_poid {
  cours: any,
  poids: number
}

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {

  constructor(
    protected _coursService: CoursService,
    protected _domainService: DomainService,
    protected _sujetService: SujetService,
    private _notifierService: NotifierService,
    protected _loaderService: LoaderService
  ) { }

  // paginator variables
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


  // variables for filter
  domainID!: number;
  sujetID!: number;
  sujetList: any[] = [];
  sujetListFilter: any[] = [];
  coursListFilter: any[] = [];

  /**
   * 
   * @param event Handle on change domain event / filter
   */
  onchangeDomain(event: any) {
    console.log(event.value);
    let ID = Number.parseInt(event.vaue);

    this.sujetListFilter = this.sujetList.filter((sujet) => { return sujet.domainID == ID; })
  }

  /**
   * handle get courses request
   */
  getCours() {
    this._coursService.getAll().subscribe(response => {
      if (response.data.errors != undefined) {
        this._notifierService.notify('error', 'Une erreur est survenue');
        console.log(response.message);

      } else {
        this._coursService.coursList = JSON.parse(response.data + '');
        this.coursListFilter = this._coursService.coursList;
      }
    });
  }

  /**
   * Handle get domains request
   */
  getDomains() {
    try {
      this._domainService.getAll().subscribe(response => {
        this._domainService.domaineList = response.data;

        // log response
        console.log(response);

      });

    } catch (error) {
      this._notifierService.notify('error', 'Une erreur est survenue.');
      console.log(error);

    }
  }

  getSujets() {
    try {
      this._sujetService.getAll().subscribe(response => {
        // if no error
        this._sujetService.sujetList = response.data;

        // log
        console.log(response);

      });

    } catch (error) {
      this._notifierService.notify('error', 'Une erreur est survenue');

      // display error
      console.log(error);
    }
  }

  rechercher() {
    if (this.sujetID) {

      // start loader
      this._loaderService.isLoading = true;
      this._coursService.getBySujetID(this.sujetID).subscribe(response => {
        // if no error
        this.coursListFilter = response.data;

        // ahp function
        this.coursListFilter = this.ahp(this.coursListFilter);
      });
    }
  }

  /**
   * Retourner le poids de langue d'un cours
   * @param lng 
   * @returns 
   */
  valueLanguage(lng: string): number {
    let value = 1;
    switch (lng) {
      case "Francais":
        value = 3;
        break;

      case "Anglais":
        value = 7;
        break;

      default:
        break;
    }

    return value;
  }
  /**
   * retourner le poids du niveau d'un cours
   * @param niveau 
   * @returns 
   */
  valueNiveau(niveau: string): number {
    let value = 1
    switch (niveau) {
      case "Débutant":
        value = 55.8;
        break;

      case "Intermediaire":
        value = 26.3;
        break;

      case "Avancé":
        value = 12.2;
        break;

      case "Expert":
        value = 5.7;
        break;

      default:
        break;
    }
    return value;
  }

  /**
   * Calculer le poids total d'un cours
   * @param cours 
   * @returns 
   */
  calc_poid(cours: any): number {
    // Poidsalternative = (P x 0,09) + (D x 0,06) + (valueLanguage(L) x 0,67) + (valueNiveau(N) x 0,17)
    let students: number = 0;
    this._coursService.getSubcribers(cours.id).subscribe(response => {
      students = response.data;
    });
    let weight_sum = 1;

    // calcul du poid total d'un cours
    weight_sum = students * 0.09 + cours.tempsApprentissage * 0.06 + this.valueLanguage(cours.langue) * 0, 67 + this.valueNiveau(cours.niveau) * 0.17;

    return weight_sum;
  }

  ahp(coursList: any[]): any[] {

    // result
    let coursListAhp: any[] = [];

    // creer un type special
    let cours_poid_list: cours_poid[] = [];

    // loop on course list 
    for (let c of coursList) {
      cours_poid_list.push(
        { cours: c, poids: this.calc_poid(c) }
      )
    }

    // classer la liste de cours_poids par odre decroissant de poids
    cours_poid_list.sort((a, b) => b.poids - a.poids);

    // on recupere la liste de sorti
    for (let cp of cours_poid_list) {
      coursListAhp.push(cp.cours);
    }

    // stop loader when ahp process finished
    this._loaderService.isLoading = false;

    return coursListAhp;
  }

  ngOnInit() {
    // get all cours 
    this.getCours();

    // init domainList
    this.getDomains();

    // get sujet
    this.getSujets();

  }

}
