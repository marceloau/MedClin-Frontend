import { TipoExameConverter } from './componentes/modulos/cadastro/tipoExame/converter/tipoexame.converter';
import { ExameComponent } from './componentes/modulos/cadastro/exame/exame.component';
import { HeaderCalendarioComponent } from './componentes/comum/calendario/calendar-header.component';
import { ConsultaComponent } from './componentes/modulos/consultas/consulta.component';
import { PerfilMedicoComponent } from './componentes/modulos/medicos/perfil/perfilmedico.component';
import { EspecialidadeConverter } from './componentes/modulos/cadastro/especialidade/converter/especialidade.converter';
import { DominioConverter } from './componentes/comum/converter/dominio.converter';
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
import { EnderecoConverter } from './componentes/comum/converter/endereco.converter';
import { TipoContatoConverter } from './componentes/modulos/cadastro/tipoContato/converter/tipocontato.converter';
import { ContatoConverter } from './componentes/comum/converter/contato.converter';
import { OperadoraConverter } from './componentes/modulos/cadastro/operadora/converter/operadora.converter';
import { TipoPlanoSaudeConverter } from './componentes/modulos/cadastro/tipoPlanoSaude/converter/tipoplanosaude.converter';
import { DatePipe, CommonModule } from '@angular/common';
import { MedicoComponent } from './componentes/modulos/medicos/medico.component';

// Inicio import calendário.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { TipoExameComponent } from './componentes/modulos/cadastro/tipoExame/tipoexame.component';
// Fim import calendário.

registerLocaleData(localePt);

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
    TipoContatoComponent,
    MedicoComponent,
    PerfilMedicoComponent,
    ConsultaComponent,
    TipoExameComponent,
    HeaderCalendarioComponent,
    ExameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // Inicio imports do calendario
    CommonModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    // Fim imports do calendario
    routes
  ],
  providers: [SegurancaService, UsuarioService, DominioConverter, EnderecoConverter,
    TipoContatoConverter, ContatoConverter, OperadoraConverter, TipoPlanoSaudeConverter, DatePipe,
    EspecialidadeConverter, TipoExameConverter],
  bootstrap: [AppComponent]
})
export class AppModule { }
