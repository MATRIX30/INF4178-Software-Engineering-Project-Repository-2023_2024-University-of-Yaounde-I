import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluation-card',
  templateUrl: './evaluation-card.component.html',
  styleUrls: ['./evaluation-card.component.css']
})
export class EvaluationCardComponent {

  constructor(
    protected _router: Router
  ) { }
  @Input() evaluation!: any;
  @Input() state!: any;

  got_to_evaluation() {
    // send this evaluation to evaluation service
    // navigate to evaluation page
    this._router.navigateByUrl('/user/home/evaluation');

  }
}
