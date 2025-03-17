import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { supportedLenguages } from '../../utilities';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class LenguageTranslatorService {

  translateService: TranslateService = inject(TranslateService);

  private readonly languageKey = 'userLanguage';


  initializeLanguage(): void {

    const userLanguage = localStorage.getItem(this.languageKey);
    const browserLanguage = this.translateService.getBrowserLang();

    const supportedLenguagesCodes = supportedLenguages.map(lenguage => lenguage.code);

    // If the user's preferred language is available, set it in the translate service
    if (userLanguage) {
      this.translateService.use(userLanguage);
    } else if ( supportedLenguagesCodes.includes(browserLanguage)) {
      this.setLanguage(browserLanguage);
    } else {
      this.setLanguage(environment.defaultLanguage);
    }
  }

  setLanguage(languageCode: string): void {
    this.translateService.use(languageCode);
    localStorage.setItem(this.languageKey, languageCode);
  }

  getLenguageCode(): string{
    return localStorage.getItem(this.languageKey);
  }
}
