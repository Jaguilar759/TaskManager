import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-check-box',
    imports: [
        ReactiveFormsModule,
        TranslateModule,
        MatCheckboxModule,
        MatTooltipModule
    ],
    templateUrl: './check-box.component.html'
})
export class CheckBoxComponent {

  formGroup = input<FormGroup>();
  controlName = input<string>();
  label = input<string>();
  tooltip = input<string>('');
  labelPosition = input<'before' | 'after'>('after');

  constructor() { }

  ngOnInit() {
  }
}
