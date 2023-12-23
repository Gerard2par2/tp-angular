import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppContextService } from './shared/services/app-context.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'tp-note';

  private readonly destroyed$ = new Subject<void>();

  public isLoading = false;

  constructor(private readonly appContextService: AppContextService,) 
  { }

  public ngOnInit(): void {
    this.appContextService.isLoading
    .pipe(takeUntil(this.destroyed$))
    .subscribe(isLoading => this.isLoading = isLoading);
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
