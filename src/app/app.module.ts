import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ServiceWorkerModule,
  SwRegistrationOptions,
} from '@angular/service-worker';
import { delay, of, tap } from 'rxjs';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js'),
  ],
  providers: [
    {
      provide: SwRegistrationOptions,
      useFactory: serviceWorkerInitFactory,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function serviceWorkerInitFactory(): SwRegistrationOptions {
  return {
    enabled: true,
    registrationStrategy: () =>
      of('lets go').pipe(delay(5000), tap(console.log)),
  };
}
