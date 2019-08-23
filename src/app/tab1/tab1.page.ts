import { Component } from '@angular/core';
import { WishService } from '../services/wish.service';
import { List } from '../models/List.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas:List[] = [];

  constructor(  public wishService: WishService, 
                private router: Router,
                private alertController: AlertController
            ) {

    this.listas = wishService.listas;
  }

  async addList() {
    const alert = await this.alertController.create({
      header: 'Nueva lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        placeholder: 'Nombre de la lista'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => console.log('cancelar')
      },
      {
        text: ' Crear',
        handler: ( data ) => {
          if( data.titulo === '') {
            return;
          }else {
            const listId = this.wishService.createList(data.titulo);
            this.router.navigate([`tabs/tab1/add/${ listId }`]);
          }
        }
      }]
    });

    alert.present();
  }

  selectedList(lista: List){
    const id: number = lista.id;
    this.router.navigate([`tabs/tab1/add/${ id }`]);
  }

}
