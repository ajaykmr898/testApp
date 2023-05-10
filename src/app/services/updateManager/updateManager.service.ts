import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { interval } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class UpdateManagerService {
  interval = 10000;
  alert = null;
  constructor(
    private update: SwUpdate,
    private alertController: AlertController
  ) {}

  showAlert() {
    if (this.alert) {
      this.alert.dismiss();
    }
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
            handler: async () => {
              await this.cancelUpdate();
            },
          },
        ],
      })
      .then(async (res) => {
        this.alert = res;
        await this.alert.present();
      });
  }

  updateClient() {
    console.log('updateClient searching...');
    if (!this.update.isEnabled) {
      return;
    }
    this.update.available.subscribe((event) => {
      console.log('available');
      this.showAlert();
    });

    this.update.activated.subscribe((event) => {
      console.log('downloading...');
    });
  }

  checkUpdate() {
    console.log('checkUpdate');
    const ti = interval(this.interval);
    ti.subscribe(() => {
      let ask = localStorage.getItem('ask');
      if (ask && ask === 'true') {
        this.showAlert();
      } else {
        this.update.checkForUpdate().then(() => {
          console.log('checking...');
        });
      }
    });
  }

  applyUpdate() {
    localStorage.removeItem('ask');
    this.update.activateUpdate().then(() => window.location.reload());
  }

  async cancelUpdate() {
    localStorage.setItem('ask', 'true');
    await this.alert.dismiss();
  }
}
