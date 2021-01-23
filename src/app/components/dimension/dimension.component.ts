import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dimension',
  templateUrl: './dimension.component.html',
  styleUrls: ['./dimension.component.scss']
})
export class DimensionComponent implements OnInit, OnDestroy {

  constructor() { }

  $destroy: Subject<any>;
  areaField: FormControl;
  computedDimensions: Array<string>;

  ngOnInit(): void {
    this.$destroy = new Subject<any>();
    this.areaField = new FormControl('');
    this.areaField.valueChanges.pipe(takeUntil(this.$destroy)).subscribe((value) => {
      this.calculateDimensions(parseInt(value));
    })
  }

  ngOnDestroy() {
    this.$destroy.complete();
  }

  calculateDimensions(value?: number) {
    this.computedDimensions = new Array();
    if (!value) {
      value = parseInt(this.areaField.value);
    }
    const squareRootValue = Math.floor(Math.sqrt(value));
    for(let i=1; i<= squareRootValue; i++) {
      if (value % i == 0) {
          if (value / i == i) {
              this.computedDimensions.push(i + ' X ' + i);
          } else {
            this.computedDimensions.push(i + ' X ' + (value / i));
          }
      }
    }
  }
}
