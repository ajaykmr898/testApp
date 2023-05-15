import { ApplicationRef, Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { environment } from '@environments/environment';
import { UpdateManagerService } from '@services/updateManager/updateManager.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private ref: ApplicationRef,
    private update: UpdateManagerService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    // this.initializeApp();
  }

  // Initialize app
  initializeApp() {
    if (environment.production) {
      this.update.checkUpdate();
      this.update.updateClient();
    }
    // Wait until platform is ready
    this.platform.ready().then(async () => {
      // If we're on a mobile platform (iOS / Android), not web
      if (Capacitor.getPlatform() !== 'web') {
        // Set StatusBar style (dark / light)
        // await StatusBar.setStyle({ style: Style.Dark });
      }

      // ...
      // do some more config and setup if necessary
      // ...

      // Fake timeout since we do not load any data
      setTimeout(async () => {
        // Hide SplashScreen
        await SplashScreen.hide();
      }, 2000);
    });
  }
}
