import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const UNIT_CONVERTER = {
  'Feet': {
    'Feet': 1,
    'Inches': 12,
    'Meters': 0.3048,
    'Centimeters': 30.48,
    'Millimeters': 304.8
  },
  'Inches': {
    'Feet': 0.0833333,
    'Inches': 1,
    'Meters': 0.0254,
    'Centimeters': 2.54,
    'Millimeters': 25.4
  },
  'Meters': {
    'Feet': 3.28084,
    'Inches': 39.37,
    'Meters': 1,
    'Centimeters': 100,
    'Millimeters': 1000
  },
  'Centimeters': {
    'Feet': 0.0328084,
    'Inches': 0.3937008,
    'Meters': 0.01,
    'Centimeters': 1,
    'Millimeters': 10
  },
  'Millimeters': {
    'Feet': 0.00328084,
    'Inches': 0.03937008,
    'Meters': 0.001,
    'Centimeters': 0.1,
    'Millimeters': 1
  },
}

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  constructor() { }

  metricUnits: Array<string>;
  firstValueField: FormGroup;
  secondValueField: FormGroup;
  outputValueField: FormGroup;

  firstValueUnit = 'Feet';
  secondValueUnit = 'Inches';
  outputValueUnit = 'Inches';

  $destroy: Subject<any>;

  ngOnInit(): void {
    this.$destroy = new Subject<any>();
    this.firstValueField = this.getNewMetric();
    this.secondValueField = this.getNewMetric();
    this.outputValueField = new FormGroup({
      value: new FormControl('0'),
      unit: new FormControl('')
    });
    this.metricUnits = [
      'Feet', 'Inches', 'Meters', 'Centimeters', 'Millimeters'
    ]

    this.firstValueField.valueChanges.pipe(takeUntil(this.$destroy)).subscribe((value) => {
      console.log('First field changed');
      this.computeResult();
    })
    this.secondValueField.valueChanges.pipe(takeUntil(this.$destroy)).subscribe((value) => {
      console.log('Second field changed');
      this.computeResult();
    })
    this.outputValueField.get('unit').valueChanges.pipe(takeUntil(this.$destroy)).subscribe((value) => {
      console.log('Output field changed');
      this.computeResult();
    })
  }

  getNewMetric() {
    return new FormGroup({
      value: new FormControl('0'),
      unit: new FormControl('')
    });
  }

  computeResult() {
    let computedValue = 0;
    if (this.firstValueField.get('unit').value) {
      this.firstValueUnit = this.firstValueField.get('unit').value;
    }
    if (this.secondValueField.get('unit').value) {
      this.secondValueUnit = this.secondValueField.get('unit').value;
    }
    if (this.outputValueField.get('unit').value) {
      this.outputValueUnit = this.outputValueField.get('unit').value;
    }
    if (this.firstValueField.get('value').value) {
      const value = parseInt(this.firstValueField.get('value').value);
      computedValue += this.convert(value, this.firstValueUnit, this.outputValueUnit);
    }
    if (this.secondValueField.get('value').value) {
      const value = parseInt(this.secondValueField.get('value').value);
      computedValue += this.convert(value, this.secondValueUnit, this.outputValueUnit);
    }
    this.outputValueField.get('value').setValue(Math.round(computedValue));
  }

  convert(value: number, inputUnit: string, outputUnit: string) {
    console.log(inputUnit + outputUnit);
    return UNIT_CONVERTER[inputUnit][outputUnit] * value;
  }

  ngOnDestroy() {
    this.$destroy.complete();
  }
}
