import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ValidatorService } from '@shared/services';

@Component({
  selector: 'app-password',
  imports: [
    ReactiveFormsModule,
    TranslateModule, 
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './password.component.html'
})
export class PasswordComponent implements OnInit {

  validatorService = inject(ValidatorService);
  
  formGroup = input.required<FormGroup>();
  controlName = input.required<string>();
  label = input<string>();
  placeholder = input<string>();
  appearance = input<'fill' | 'outline'>('outline');
  tooltip = input<string>();

  isPasswordVisible = signal(true);

  appearanceValue = computed(() => this.appearance() ?? 'outline');

  ngOnInit() {
  }


  clickEventPassword(event: MouseEvent) {
    this.isPasswordVisible.set(!this.isPasswordVisible());
    event.stopPropagation();
  }

  getFieldError(field: string): string | null {
    return this.validatorService.formFielValidator(this.formGroup(), field);
  }

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.formGroup(), field);
  }

}
