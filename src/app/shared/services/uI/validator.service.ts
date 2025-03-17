import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  translate: TranslateService = inject(TranslateService);

  public isValidField( form: FormGroup, field: string ) {
    return form.controls[field]?.errors && form.controls[field]?.touched;
  }

  formFielValidator( form: FormGroup, field: string ): string | null {
    if ( !form.controls[field] ) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return this.translate.instant('validatorRequired');
        case 'minlength':
          return `${this.translate.instant('validatorMinLength', {min: errors[key].requiredLength})}`;
        case 'maxlength':
          return `${this.translate.instant('validatorMaxlength', {max: errors[key].requiredLength})}`;
        case 'min':
          return `${this.translate.instant('validatorMin', {min: errors[key].min})}`;
        case 'max':
          return `${this.translate.instant('validatorMax', {max: errors[key].max})}`;
        case 'pattern':
          return this.translate.instant('validatorPattern');
        case 'email':
          return this.translate.instant('validatorEmail');
      }
    }
    return null;
  }

}
