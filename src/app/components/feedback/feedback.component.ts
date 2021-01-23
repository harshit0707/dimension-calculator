import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy {

  constructor() { }

  $destroy: Subject<any>;
  feedbackField: FormControl;
  computedDimensions: Array<string>;

  ngOnInit(): void {
    this.$destroy = new Subject<any>();
    this.feedbackField = new FormControl('');
  }

  ngOnDestroy() {
    this.$destroy.complete();
  }

  submitFeedback() {
    
  }
}
