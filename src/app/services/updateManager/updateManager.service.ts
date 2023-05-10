import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { interval } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class UpdateManagerService {
  interval = 5000;
  constructor(
    private update: SwUpdate,
    private alertController: AlertController
  ) {}

  showAlert() {
    this.alertController
      .create({
        header: 'Update',
        subHeader: 'New version available',
        message: 'Do you want to update the app now?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.applyUpdate();
            },
          },
          {
            text: 'Later',
            handler: () => {
              this.cancelUpdate();
            },
          },
        ],
      })
      .then(async (res) => {
        await res.present();
      });
  }

  updateClient() {
    if (!this.update.isEnabled) {
      return;
    }
    this.update.available.subscribe((event) => {
      this.showAlert();
    });

    this.update.activated.subscribe((event) => {
      console.log('downloading...');
    });
  }

  checkUpdate() {
    const ti = interval(this.interval);
    ti.subscribe(() => {
      this.update.checkForUpdate().then(() => console.log('check'));
    });
  }

  applyUpdate() {
    this.update.activateUpdate().then(() => window.location.reload());
  }

  cancelUpdate() {
    console.log('canceled');
  }
}
