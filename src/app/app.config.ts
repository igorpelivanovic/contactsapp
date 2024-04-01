import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations'


export const appConfig: ApplicationConfig = {
  providers: [ provideRouter(routes, withComponentInputBinding()),  
    DatePipe, 
    ReactiveFormsModule, 
    provideAnimations()
  ]};
