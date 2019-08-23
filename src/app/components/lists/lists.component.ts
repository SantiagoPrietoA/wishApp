import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WishService } from '../../services/wish.service';
import { Router } from '@angular/router';
import { List } from '../../models/List.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  listas: List[] = [];

  @Input() terminados = true;
  @ViewChild( IonList ) listaTag: IonList;

  constructor(  public wishService: WishService, 
                private router: Router,
                private alertController: AlertController
            ) {

    this.listas = wishService.listas;
  }

  ngOnInit(){

  }

  async editList( lista: List ) {
    const alert = await this.alertController.create({
      header: 'Nueva lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        value: lista.titulo,
        placeholder: 'Nombre de la lista'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => console.log('cancelar')
      },
      {
        text: ' Editar',
        handler: ( data ) => {
          if( data.titulo === '') {
            return;
          }else {
            const listId = this.wishService.editList(lista,data.titulo);
            this.listaTag.closeSlidingItems();
          }
        }
      }]
    });

    alert.present();
  }

  borrar( lista: List) {
    this.wishService.deletList(lista);
  }

  selectedList(lista: List){
    const id: number = lista.id;
    if(this.terminados) {
      this.router.navigate([`tabs/tab2/add/${ id }`]);
    }else {
      this.router.navigate([`tabs/tab1/add/${ id }`]);
    }
  }
}
