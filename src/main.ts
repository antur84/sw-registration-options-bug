import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideServiceWorker, SwRegistrationOptions } from '@angular/service-worker';
import { of, delay, tap } from 'rxjs';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: SwRegistrationOptions,
      useFactory: serviceWorkerInitFactory,
    },
    provideServiceWorker('ngsw-worker.js'),
  ],
});

export function serviceWorkerInitFactory(): SwRegistrationOptions {
  return {
    enabled: true,
    registrationStrategy: () =>
      of('lets go').pipe(delay(5000), tap(console.log)),
  };
}
