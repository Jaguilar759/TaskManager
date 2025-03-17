import { Component, output, signal, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, LenguageTranslatorService } from '@shared/services';
import { supportedLenguages } from '@shared/utilities';

@Component({
    selector: 'app-menu',
    imports: [RouterLink, RouterLinkActive, TranslateModule, MatMenuModule],
    templateUrl: './menu.component.html'
})
export class MenuComponent {

    lenguageTranslatorService: LenguageTranslatorService = inject(LenguageTranslatorService);
    authService = inject(AuthService);
    router = inject(Router);
    isExpanded = signal(false);
    toggleSidebar = output<boolean>();
  
    lenguages = supportedLenguages;
    
    toggleSidebarMenu() {
      this.isExpanded.set(!this.isExpanded());
      this.toggleSidebar.emit(this.isExpanded());
    }

    logout(){
      this.authService.logout();
      this.router.navigate(['/login']);
    }

    selectLanguage(lang: string) {
      this.lenguageTranslatorService.setLanguage(lang);
    }
}
