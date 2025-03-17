import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from '@shared/components';

@Component({
    selector: 'app-home',
    imports: [
        BreadcrumbComponent,
        TranslateModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {
  }

}
