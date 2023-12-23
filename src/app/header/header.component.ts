import { Component } from '@angular/core';
import { AppContextService } from '../shared/services/app-context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public constructor(
    public readonly appContextService: AppContextService,
    private readonly router: Router) { }

  public linkClicked(route: string[]): void {
    this.router.navigate(route);
  }
}
