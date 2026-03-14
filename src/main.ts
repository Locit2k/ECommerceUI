import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment.development';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key provided by the user
registerLicense(environment.ej2Key);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
