import { Component } from '@angular/core';
import { AppContextService } from '../shared/services/app-context.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public constructor(public readonly appContextService: AppContextService) { }
}
