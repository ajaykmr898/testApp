import { ApplicationRef, Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private update: SwUpdate,
    private ref: ApplicationRef
  ) {
    this.initializeApp();
  }

  // Initialize app
  initializeApp() {
    this.checkUpdate();
    this.updateClient();
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

  updateClient() {
    alert('here');
    if (!this.update.isEnabled) {
      alert('current 0');
      return;
    }
    this.update.available.subscribe((event) => {
      alert('current 1');
      if (confirm('new update available')) {
        this.update.activateUpdate().then(() => location.reload());
      }
    });

    this.update.activated.subscribe((event) => {
      alert('current 2');
    });
  }

  checkUpdate() {
    const ti = interval(10000);
    ti.subscribe(() => {
      this.update.checkForUpdate().then(() => alert('current 3'));
    });
  }
}
