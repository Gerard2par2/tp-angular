import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tp-note';

  constructor(private readonly matIconRegistry: MatIconRegistry,) {
    this.matIconRegistry.setDefaultFontSetClass('material-icons-extended')
  }

  public ngOnInit(): void {

  }
}
