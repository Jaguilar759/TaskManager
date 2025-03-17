import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '..';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-principal',
    imports: [RouterOutlet, MenuComponent, CommonModule],
    templateUrl: './principal.component.html'
})
export class PrincipalComponent {
    
    isExpanded = false;

    onToggleSidebar(expanded: boolean) {
      this.isExpanded = expanded;
    }
}
