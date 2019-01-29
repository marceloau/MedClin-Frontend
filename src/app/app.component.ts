import { AuthService } from './componentes/seguranca/auth.service';
import { SessionStorageService } from './componentes/seguranca/session-storage.service';
import { SegurancaService } from './componentes/seguranca/seguranca.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MedClin';

  mostrarMenu: boolean = false;
  public seguranca: SegurancaService;

  constructor(private storage: SessionStorageService, private authServuce: AuthService) {
    this.seguranca = SegurancaService.getInstancia();
    this.mostrarMenu = false;
  }

  ngOnInit() {
    const usuario = this.storage.get('logged');
    if (usuario && usuario.token) {
      this.authServuce.mostrarMenuEmitter.subscribe(
        mostrar => this.mostrarMenu = mostrar
      );
    }
  }
}
