import { Component, computed, inject, input, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ValidatorService } from '@shared/services';

@Component({
    selector: 'app-number',
    imports: [ReactiveFormsModule, TranslateModule, MatFormField, MatLabel, MatTooltipModule, MatError, MatInputModule],
    templateUrl: './number.component.html'
})
export class NumberComponent implements OnInit {

  validatorService = inject(ValidatorService);

  formGroup = input<FormGroup>();
  controlName = input<string>();
  label = input<string>();
  placeholder = input<string>();
  appearance = input<'fill' | 'outline'>('outline');
  autocomplete = input<'on' | 'off'>('on');
  tooltip = input<string>('');

  appearanceValue = computed(() => this.appearance() ?? 'outline');
  autocompleteValue = computed(() => this.autocomplete() ?? 'off');

  constructor() { }

  ngOnInit() {
  }

  getFieldError(field: string): string | null {
    return this.validatorService.formFielValidator(this.formGroup(), field);
  }

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.formGroup(), field);
  }
}
