import { Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { MatError } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { ValidatorService } from '@shared/services';

@Component({
  selector: 'app-radio-button',
  imports: [
    MatRadioModule,
    ReactiveFormsModule,
    TranslateModule,
    MatError
  ],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss'
})
export class RadioButtonComponent {
  validatorService = inject(ValidatorService);
  
  formGroup = input.required<FormGroup>();
  controlName = input.required<string>();
  options = input<{ label: string; value: any }[]>();

  getFieldError(field: string): string | null {
    return this.validatorService.formFielValidator(this.formGroup(), field);
  }

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.formGroup(), field);
  }
}
