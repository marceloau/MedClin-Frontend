import { SolicitacaoMedicamento } from './../../../model/solicitacaomedicamento.model';
import { SolicitacaoExame } from './../../../model/solicitacaoexame.model';
import { DatePipe } from '@angular/common';
import { TimeLine } from './../../../model/comum/timeline.model';
import { Consulta } from './../../../model/consulta.model';
import { Constantes } from '../constantes';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeLineConverter {

  constructor(private datePipe: DatePipe) { }

  montarTimeLineHistoricoClinico(listaConsulta: Array<Consulta>): Array<TimeLine> {
    if (listaConsulta && listaConsulta.length > 0) {
      const retorno = new Array<TimeLine>();
      for (const index of listaConsulta) {
        if (retorno.length > 0) {
          let existeTimeLine: Boolean = false;
          for (const timeLine of retorno) {
            if (this.datePipe.transform(timeLine.data, Constantes.FORMATO_DATA_FRONTEND) ===
            this.datePipe.transform(index.dataConsulta, Constantes.FORMATO_DATA_FRONTEND)) {
              timeLine.objetos.push(index);
              existeTimeLine = true;
              break;
            }
          }
          if (!existeTimeLine) {
            const timeLineNova = new TimeLine();
            timeLineNova.data = index.dataConsulta;
            timeLineNova.objetos = new Array<Consulta>();
            timeLineNova.objetos.push(index);
            retorno.push(timeLineNova);
          }
        } else {
          const timeLineNova = new TimeLine();
          timeLineNova.data = index.dataConsulta;
          timeLineNova.objetos = new Array<Consulta>();
          timeLineNova.objetos.push(index);
          retorno.push(timeLineNova);
        }
      }
      return retorno;
    }
  }

  montarTimeLineSolicitacaoExame(listaSolicitacaoExame: Array<SolicitacaoExame>): Array<TimeLine> {
    if (listaSolicitacaoExame && listaSolicitacaoExame.length > 0) {
      const retorno = new Array<TimeLine>();
      for (const index of listaSolicitacaoExame) {
        if (retorno.length > 0) {
          let existeTimeLine: Boolean = false;
          for (const timeLine of retorno) {
            if (this.datePipe.transform(timeLine.data, Constantes.FORMATO_DATA_FRONTEND) ===
            this.datePipe.transform(index.dataSolicitacaoExame, Constantes.FORMATO_DATA_FRONTEND)) {
              timeLine.objetos.push(index);
              existeTimeLine = true;
              break;
            }
          }
          if (!existeTimeLine) {
            const timeLineNova = new TimeLine();
            timeLineNova.data = index.dataSolicitacaoExame;
            timeLineNova.objetos = new Array<Consulta>();
            timeLineNova.objetos.push(index);
            retorno.push(timeLineNova);
          }
        } else {
          const timeLineNova = new TimeLine();
          timeLineNova.data = index.dataSolicitacaoExame;
          timeLineNova.objetos = new Array<Consulta>();
          timeLineNova.objetos.push(index);
          retorno.push(timeLineNova);
        }
      }
      return retorno;
    }
  }

  montarTimeLineSolicitacaoMedicamento(listaSolicitacaoMedicamento: Array<SolicitacaoMedicamento>): Array<TimeLine> {
    if (listaSolicitacaoMedicamento && listaSolicitacaoMedicamento.length > 0) {
      const retorno = new Array<TimeLine>();
      for (const index of listaSolicitacaoMedicamento) {
        if (retorno.length > 0) {
          let existeTimeLine: Boolean = false;
          for (const timeLine of retorno) {
            if (this.datePipe.transform(timeLine.data, Constantes.FORMATO_DATA_FRONTEND) ===
            this.datePipe.transform(index.dataSolicitacaoMedicamento, Constantes.FORMATO_DATA_FRONTEND)) {
              timeLine.objetos.push(index);
              existeTimeLine = true;
              break;
            }
          }
          if (!existeTimeLine) {
            const timeLineNova = new TimeLine();
            timeLineNova.data = index.dataSolicitacaoMedicamento;
            timeLineNova.objetos = new Array<Consulta>();
            timeLineNova.objetos.push(index);
            retorno.push(timeLineNova);
          }
        } else {
          const timeLineNova = new TimeLine();
          timeLineNova.data = index.dataSolicitacaoMedicamento;
          timeLineNova.objetos = new Array<Consulta>();
          timeLineNova.objetos.push(index);
          retorno.push(timeLineNova);
        }
      }
      return retorno;
    }
  }

}
