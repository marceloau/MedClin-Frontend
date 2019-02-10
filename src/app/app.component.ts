import { DatePipe } from '@angular/common';
import { Constantes } from './componentes/comum/constantes';
import { Mensagem } from './model/mensagem';
import { Excecao } from './componentes/comum/excecao/excecao';
import { AuthService } from './componentes/seguranca/auth.service';
import { SegurancaService } from './componentes/seguranca/seguranca.service';
import { Component, OnInit, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Excecao]
})
export class AppComponent implements OnInit {
  title = 'MedClin';

  mostrarMenu: boolean = false;
  public seguranca: SegurancaService;
  mostrarMenuEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  listaConsultaDia = new Array();
  dataHoje = this.datePipe.transform(new Date(), Constantes.FORMATO_DATA_BACKEND_DATE);
  mensagem = new Mensagem();

  constructor(private authService: AuthService, private datePipe: DatePipe,
    private cdRef : ChangeDetectorRef) {
    this.seguranca = SegurancaService.getInstancia();
    this.authService.mostrarMenuEmitter.subscribe(data => this.mostrarMenu = data);
  }

  ngOnInit() {}

  ngAfterViewChecked() {
    //let show = this.isShowExpand();
    if (this.mostrarMenu) { // check if it change, tell CD update view
      //this.mostrarMenu = show;
      this.cdRef.detectChanges();
    }
  }

  isShowExpand()
  {
    //return true;
  }
}
