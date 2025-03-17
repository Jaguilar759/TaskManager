import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LenguageTranslatorService } from './shared/services';

@Component({
    selector: 'app-root',
    imports: [TranslateModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private LenguageTranslatorService: LenguageTranslatorService
  ) {
    this.LenguageTranslatorService.initializeLanguage();
  }
}
