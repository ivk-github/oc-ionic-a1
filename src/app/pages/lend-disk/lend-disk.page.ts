import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';

import { DiskModel } from 'src/app/models/disk-model';

import { MediasService } from 'src/app/services/medias.service';

@Component({
  selector: 'app-lend-disk',
  templateUrl: './lend-disk.page.html',
  styleUrls: ['./lend-disk.page.scss'],
})
export class LendDiskPage implements OnInit {

  @Input() diskId: number;
  disk: DiskModel;

  constructor(private modalController: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private mediasService: MediasService) { }

  ngOnInit() {
    this.disk = this.mediasService.disksList.find(disk => disk.id === this.diskId);
  }

  onDismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async onLend() {
    /* Présentation du loader */
    let loader = await this.loadingCtrl.create({
      message: 'Sauvegarde en cours…'
    });
    loader.present();

    this.mediasService.isLentManager(this.disk).then(
      async () => {
        /* Désactivation du loader */
        loader.dismiss();

        /* Présentation du toast */
        let toast = await this.toastCtrl.create({
          message: 'Données sauvegardées !',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      },
      async (error) => {
        loader.dismiss();
        let toast = await this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
    );
  }
}
