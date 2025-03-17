import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '@shared/components';

@Component({
    selector: 'app-page-not-found',
    imports: [TranslateModule, ButtonComponent],
    templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent {

    constructor(private router: Router) {}
    
    backToHome(){
        this.router.navigate(['/']);
    }
}
