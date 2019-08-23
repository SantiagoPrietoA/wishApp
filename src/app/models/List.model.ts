import { ListItem } from './list-item.model';

export class List {

    id: number;
    titulo: string;
    creadaEn: Date;
    terminadaEn: Date;
    terminada: boolean;
    item: ListItem[];

    constructor( titulo: string ) {
        
        this.titulo = titulo;
        this.creadaEn = new Date();
        this.terminada = false;
        this.item = [];
        this.id = new Date().getTime();
    }

}