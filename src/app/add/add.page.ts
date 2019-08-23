import { Component, OnInit } from '@angular/core';
import { WishService } from '../services/wish.service';
import { ActivatedRoute } from '@angular/router';
import { List } from '../models/List.model';
import { ListItem } from '../models/list-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  lista: List;
  nombreItem = '';
  constructor( private wishService: WishService, private route: ActivatedRoute) { 
    const listaId = this.route.snapshot.paramMap.get('listId');
    this.lista = this.wishService.returnList(listaId);
  }

  ngOnInit() {
  }

  addItem() {
    if( this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListItem( this.nombreItem );
    this.lista.item.push(nuevoItem);
    this.nombreItem = '';
  
  }

  changeCheck( item: ListItem ) {
    const pendientes = this.lista.item.filter( itemData => !itemData.completado).length;

    if( pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }
    this.wishService.saveStorage();
  }

  borrar( i: number) {
    this.lista.item.splice(i,1);
    this.wishService.saveStorage();
  }

}
