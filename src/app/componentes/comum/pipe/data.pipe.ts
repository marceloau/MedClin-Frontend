import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Constantes } from '../constantes';

@Pipe({
  name: 'data-pipe'
})
export class DataPipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let dataFormatada: any;
    if (args === 'Back') {
      dataFormatada = super.transform(value, Constantes.FORMATO_DATA_BACKEND);
    } else {
      dataFormatada = super.transform(value, Constantes.FORMATO_DATA_FRONTEND);
    }
    return dataFormatada;
  }

}
