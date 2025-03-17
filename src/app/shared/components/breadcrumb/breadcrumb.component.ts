import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbRoute } from '@shared/models';

@Component({
    selector: 'app-breadcrumb',
    imports: [RouterLink, TranslateModule],
    templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {
  routes = input<BreadcrumbRoute[]>([]);
}
