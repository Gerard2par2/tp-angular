import { Injectable, OnDestroy } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to handle the application context
 */
export class AppContextService implements OnDestroy {

  private readonly destroy$: Subject<void> = new Subject<void>();
  private readonly appName$: BehaviorSubject<string> = new BehaviorSubject<string>('Gérer vos utilisateurs');
  private readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(router: Router) {
    this.setupRouterEventSubscription(router);
  }

  public get appName(): BehaviorSubject<string> {
    return this.appName$;
  }

    public get isLoading(): BehaviorSubject<boolean> {
        return this.isLoading$;
    }

  /**
   * Sets up the router event subscription to update the application name
   * @param router the router to subscribe to
   */
  private setupRouterEventSubscription(router: Router): void {
    router.events.pipe(
      filter((e: unknown): e is RouterEvent => e instanceof RouterEvent),
      takeUntil(this.destroy$)
   ).subscribe((e: RouterEvent) => {
    console.log(e.url.split('/')[1]);
    switch (e.url.split('/')[1]) {
       case 'users':
         this.appName$.next('Gérer vos utilisateurs');
         break;
       case 'add':
         this.appName$.next('Ajouter un utilisateur');
         break;
       case 'update':
         this.appName$.next('Modifier un utilisateur');
         break;
       case 'user':
         this.appName$.next('Détails d\'un utilisateur');
         break;
       default:
         this.appName$.next('Gérer vos utilisateurs');
         break;
     }
   });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
