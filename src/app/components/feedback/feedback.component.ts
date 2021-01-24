import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy {

  constructor(private _gaservice: GoogleAnalyticsService,
    private _snackBar: MatSnackBar) {}

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
    const feedback = this.feedbackField.value;
    this.feedbackField.setValue('');
    this._snackBar.open('Thanks for your valuable feedback!', null , {
      duration: 2000,
    });
    this._gaservice.sendEvent('feedback_submit', 'feedback', feedback);
  }
}
