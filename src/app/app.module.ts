import { TipoContatoComponent } from './componentes/modulos/cadastro/tipoContato/tipocontato.component';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/comum/header/header.component';
import { FooterComponent } from './componentes/comum/footer/footer.component';
import { MenuComponent } from './componentes/comum/menu/menu.component';
import { ConfiguracoesComponent } from './componentes/comum/configuracoes/configuracoes.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';

import { SegurancaService } from './componentes/seguranca/seguranca.service';
import { UsuarioService } from './componentes/comum/services/usuario.service';
import { PacientesComponent } from './componentes/modulos/pacientes/pacientes.component';
import { PerfilComponent } from './componentes/modulos/perfil/perfil.component';
import { EspecialidadeComponent } from './componentes/modulos/cadastro/especialidade/especialidade.component';
import { PaginacaoComponent } from './componentes/comum/paginacao/paginacao.component';
import { OperadoraComponent } from './componentes/modulos/cadastro/operadora/operadora.component';
import { TipoPlanoSaudeComponent } from './componentes/modulos/cadastro/tipoPlanoSaude/tipoplanosaude.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ConfiguracoesComponent,
    HomeComponent,
    LoginComponent,
    PacientesComponent,
    PerfilComponent,
    EspecialidadeComponent,
    PaginacaoComponent,
    OperadoraComponent,
    TipoPlanoSaudeComponent,
    TipoContatoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes
  ],
  providers: [SegurancaService, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
