import { Injectable } from '@angular/core';
import { List } from '../models/List.model';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  listas: List[] = [];

  constructor() {
    this.loadStorage();
   }

   createList( titulo: string) {
     const newList = new List(titulo);
     this.listas.push(newList);
     this.saveStorage();
     return newList.id;
   }

   deletList( list: List) {
    //  this.listas = this.listas.filter( listData => listData.id !== list.id);
     const index = this.listas.indexOf(list); 
     this.listas.splice(index,1);
     this.saveStorage();
   }

   editList( list: List, title: string) {
    //  this.listas = this.listas.filter( listData => listData.id !== list.id);
     list.titulo = title;
     this.saveStorage();
   }

   returnList(id: string | number): any {
     id = Number(id);
     return this.listas.find( listData => listData.id === id);
   }

   saveStorage() {
     localStorage.setItem('data', JSON.stringify(this.listas));
   }

   loadStorage() {
     if( localStorage.getItem('data') ){
       this.listas = JSON.parse(localStorage.getItem('data'));
     }
   }
}
