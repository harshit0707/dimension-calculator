import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ScreenResolutionService } from 'src/app/services/screen-resolution.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('elementAnimation', [
      state('initial', style({
        transform: 'translateY(10%)', opacity: 0
      })),
      state('final', style({
        transform: 'translateY(0%)', opacity: 1
      })),
      transition('initial => final', [
        animate('1s ease-in-out')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  dimensionToolInFocus: boolean;
  converterToolInFocus: boolean;
  feedbackInFocus: boolean;

  $destroy: Subject<any>;

  constructor(private _deviceSizeService: ScreenResolutionService) { }

  ngOnInit(): void {
    this.$destroy = new Subject<any>();
  }

  ngAfterViewInit() {
    if (this._deviceSizeService.deviceSize === 0
      || this._deviceSizeService.deviceSize === 1) {
        setTimeout(() => {
          this._deviceSizeService.$scrollTopSubject.pipe(takeUntil(this.$destroy))
          .subscribe((topPosition)=> {
            if (topPosition >= 0) this.dimensionToolInFocus = this.converterToolInFocus = true;
            if (topPosition > 500) this.feedbackInFocus = true;
          });
        });
    } else {
      setTimeout(() => {
        this.dimensionToolInFocus = true;
        this.converterToolInFocus = true;
        this.feedbackInFocus = true;
      }, 100)
    }
  }

  ngOnDestroy() {
    this.$destroy.complete();
  }
}
