import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const MULTIPLY = 'multiply';
const DIVIDE = 'divide';
const UNIT_CONVERTER = {
  'Feet': {
    'Feet': {
      'operation': MULTIPLY,
      'value': 1
    },
    'Inches': {
      'operation': MULTIPLY,
      'value': 12
    },
    'Meters': {
      'operation': DIVIDE,
      'value': 3.281
    },
    'Centimeters': {
      'operation': MULTIPLY,
      'value': 30.48
    },
    'Millimeters': {
      'operation': MULTIPLY,
      'value': 304.8
    }
  },
  'Inches': {
    'Feet': {
      'operation': DIVIDE,
      'value': 12
    },
    'Inches': {
      'operation': MULTIPLY,
      'value': 1
    },
    'Meters': {
      'operation': MULTIPLY,
      'value': 0.0254
    },
    'Centimeters': {
      'operation': MULTIPLY,
      'value': 2.54
    },
    'Millimeters': {
      'operation': MULTIPLY,
      'value': 25.4
    }
  },
  'Meters': {
    'Feet': {
      'operation': MULTIPLY,
      'value': 3.281
    },
    'Inches': {
      'operation': MULTIPLY,
      'value': 39.37
    },
    'Meters': {
      'operation': MULTIPLY,
      'value': 1
    },
    'Centimeters': {
      'operation': MULTIPLY,
      'value': 100
    },
    'Millimeters': {
      'operation': MULTIPLY,
      'value': 1000
    }
  },
  'Centimeters': {
    'Feet': {
      'operation': DIVIDE,
      'value': 30.48
    },
    'Inches': {
      'operation': DIVIDE,
      'value': 2.54
    },
    'Meters': {
      'operation': MULTIPLY,
      'value': 0.01
    },
    'Centimeters': {
      'operation': MULTIPLY,
      'value': 1
    },
    'Millimeters': {
      'operation': MULTIPLY,
      'value': 10
    }
  },
  'Millimeters': {
    'Feet': {
      'operation': DIVIDE,
      'value': 305
    },
    'Inches': {
      'operation': DIVIDE,
      'value': 25.4
    },
    'Meters': {
      'operation': MULTIPLY,
      'value': 0.001
    },
    'Centimeters': {
      'operation': MULTIPLY,
      'value': 0.1
    },
    'Millimeters': {
      'operation': MULTIPLY,
      'value': 1
    }
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
  approximateValueWarningFlag: boolean;

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
      this.computeResult();
    })
    this.secondValueField.valueChanges.pipe(takeUntil(this.$destroy)).subscribe((value) => {
      this.computeResult();
    })
    this.outputValueField.get('unit').valueChanges.pipe(takeUntil(this.$destroy)).subscribe((value) => {
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
      const value = parseFloat(this.firstValueField.get('value').value);
      computedValue += this.convert(value, this.firstValueUnit, this.outputValueUnit);
    }
    if (this.secondValueField.get('value').value) {
      const value = parseFloat(this.secondValueField.get('value').value);
      computedValue += this.convert(value, this.secondValueUnit, this.outputValueUnit);
    }
    this.approximateValueWarningFlag = (computedValue % 1 !== 0);
    this.outputValueField.get('value').setValue(computedValue.toFixed(5));
  }

  convert(value: number, inputUnit: string, outputUnit: string): number {
    if (UNIT_CONVERTER[inputUnit][outputUnit]['operation'] === MULTIPLY) {
      return value * UNIT_CONVERTER[inputUnit][outputUnit]['value'];
    } else if (UNIT_CONVERTER[inputUnit][outputUnit]['operation'] === DIVIDE) {
      return value / UNIT_CONVERTER[inputUnit][outputUnit]['value'];
    } else {
      return value;
    }
  }

  ngOnDestroy() {
    this.$destroy.complete();
  }
}
