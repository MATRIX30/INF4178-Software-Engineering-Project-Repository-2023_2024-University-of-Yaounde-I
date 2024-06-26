import { Component } from '@angular/core';
import { LoaderService } from 'src/app/Services/Loader/loader.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent {

  constructor(
    protected _loaderService: LoaderService
  ) { }

  submited: boolean = false;

  submit() {
    // code ...
    this.submited = true;
  }

}
