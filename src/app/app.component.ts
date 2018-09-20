import { SegurancaService } from './componentes/seguranca/seguranca.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MedClin';

  usuarioLogado: boolean;
  public seguranca: SegurancaService;

  constructor() {
    this.seguranca = SegurancaService.getInstancia();
    this.usuarioLogado = true;
  }

  ngOnInit() {
    this.seguranca.usuarioLogado.subscribe(
      show => this.usuarioLogado = show
    );
  }
}
