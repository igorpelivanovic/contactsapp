import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DatePipe, JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), DatePipe, ReactiveFormsModule, JsonPipe, provideAnimations()]
};
