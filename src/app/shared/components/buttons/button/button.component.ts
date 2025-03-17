import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-button',
    imports: [MatButtonModule, TranslateModule, MatTooltipModule],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent {

  textButton = input<string>('');
  typeButtonMaterial = input<'Basic' | 'Raised' | 'Stroked' | 'Flat'>('Flat');
  colorButton = input<'primary' | 'accent' | 'warn'>('primary');
  disabledButton = input<boolean>(false);
  tooltipButton = input<string>('');
  typeButton = input<'button' | 'submit'>('button');

}
