import { TipoExameComponent } from './componentes/modulos/cadastro/tipoExame/tipoexame.component';
import { ErrorInterceptor } from './componentes/seguranca/erro-interceptor.service';
import { TokenInterceptor } from './componentes/seguranca/token-interceptor.service';
import { TimeLineConverter } from './componentes/comum/converter/timeline.converter';
import { SolicitacaoMedicamentoConverter } from './componentes/modulos/consultas/converter/solicitacaomedicamento.converter';
import { SolicitacaoExameConverter } from './componentes/modulos/consultas/converter/solicitacaoexame.converter';
import { AtendimentoConsultaComponent } from './componentes/modulos/consultas/atendimento/atendimentoconsulta.component';
import { MedicamentoComponent } from './componentes/modulos/cadastro/medicamento/medicamento.component';
import { TipoMedicamentoConverter } from './componentes/modulos/cadastro/tipoMedicamento/converter/tipomedicamento.converter';
import { TipoMedicamentoComponent } from './componentes/modulos/cadastro/tipoMedicamento/tipomedicamento.component';
import { TipoExameConverter } from './componentes/modulos/cadastro/tipoExame/converter/tipoexame.converter';
import { ExameComponent } from './componentes/modulos/cadastro/exame/exame.component';
import { HeaderCalendarioComponent } from './componentes/comum/calendario/calendar-header.component';
import { ConsultaComponent } from './componentes/modulos/consultas/consulta.component';
import { PerfilMedicoComponent } from './componentes/modulos/medicos/perfil/perfilmedico.component';
import { EspecialidadeConverter } from './componentes/modulos/cadastro/especialidade/converter/especialidade.converter';
import { DominioConverter } from './componentes/comum/converter/dominio.converter';
import { TipoContatoComponent } from './componentes/modulos/cadastro/tipoContato/tipocontato.component';
import { AppRouterModule } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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

// Inicio import notificações temporarias
import { ToastrModule } from 'ng6-toastr-notifications';
// Fim import notificações temporarias

// Inicio import calendário.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
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
    ExameComponent,
    TipoMedicamentoComponent,
    MedicamentoComponent,
    AtendimentoConsultaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    // Inicio imports do calendario
    CommonModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    // Fim imports do calendario
    AppRouterModule
  ],
  providers: [SegurancaService, UsuarioService, DominioConverter, EnderecoConverter,
    TipoContatoConverter, ContatoConverter, OperadoraConverter, TipoPlanoSaudeConverter, DatePipe,
    EspecialidadeConverter, TipoExameConverter, TipoMedicamentoConverter, SolicitacaoExameConverter,
    SolicitacaoMedicamentoConverter, TimeLineConverter,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
