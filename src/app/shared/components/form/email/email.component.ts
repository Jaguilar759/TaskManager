import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ValidatorService } from '@shared/services';

@Component({
  selector: 'app-email',
  imports: [
    ReactiveFormsModule,
    TranslateModule, 
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule
  ],
  templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {
  

  validatorService = inject(ValidatorService);
  
  formGroup = input.required<FormGroup>();
  controlName = input.required<string>();
  label = input<string>();
  placeholder = input<string>();
  appearance = input<'fill' | 'outline'>('outline');
  autocomplete = input<'on' | 'off'>('off');
  tooltip = input<string>();

  appearanceValue = computed(() => this.appearance() ?? 'outline');
  autocompleteValue = computed(() => this.autocomplete() ?? 'off');

  ngOnInit() {
  }

  getFieldError(field: string): string | null {
    return this.validatorService.formFielValidator(this.formGroup(), field);
  }

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.formGroup(), field);
  }


}
