import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../models/List.model';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(listas: List[], complete: boolean = true) {
    return listas.filter( lista => lista.terminada === complete);     
  }

}
