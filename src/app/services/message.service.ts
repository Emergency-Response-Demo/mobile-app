import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private toastController: ToastController) { }

  async success(msg: string) {
    this.showMessage(msg, 'success');
  }

  async error(msg: string) {
    this.showMessage(msg, 'danger');
  }

  async info(msg: string) {
    this.showMessage(msg);
  }

  async warning(msg: string) {
    this.showMessage(msg, 'warning');
  }

  async showMessage(msg: string, color = 'primary') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      color: color,
      position: "top"
    });
    toast.present();
  }
}