import { PreAtendimentoConsultaComponent } from './componentes/modulos/consultas/atendimento/preatendimentoconsulta/preatendimentoconsulta.component';
import { GuardService } from './componentes/seguranca/guard.service';
import { AtendimentoConsultaComponent } from './componentes/modulos/consultas/atendimento/atendimentoconsulta.component';
import { MedicamentoComponent } from './componentes/modulos/cadastro/medicamento/medicamento.component';
import { TipoMedicamentoComponent } from './componentes/modulos/cadastro/tipoMedicamento/tipomedicamento.component';
import { ConsultaComponent } from './componentes/modulos/consultas/consulta.component';
import { PerfilMedicoComponent } from './componentes/modulos/medicos/perfil/perfilmedico.component';
import { MedicoComponent } from './componentes/modulos/medicos/medico.component';
import { TipoContatoComponent } from './componentes/modulos/cadastro/tipoContato/tipocontato.component';
import { OperadoraComponent } from './componentes/modulos/cadastro/operadora/operadora.component';
import { EspecialidadeComponent } from './componentes/modulos/cadastro/especialidade/especialidade.component';
import { PerfilComponent } from './componentes/modulos/perfil/perfil.component';
import { PacientesComponent } from './componentes/modulos/pacientes/pacientes.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';

import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { TipoPlanoSaudeComponent } from './componentes/modulos/cadastro/tipoPlanoSaude/tipoplanosaude.component';
import { TipoExameComponent } from './componentes/modulos/cadastro/tipoExame/tipoexame.component';
import { ExameComponent } from './componentes/modulos/cadastro/exame/exame.component';

export const ROUTES: Routes = [
  {
    path: 'painel',
    component: HomeComponent,
    canActivate: [GuardService],
    canLoad: [GuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'pacientes',
    component: PacientesComponent,
    canActivate: [GuardService]
  },
  {
    path: 'paciente/perfil/:codigo',
    component: PerfilComponent,
    canActivate: [GuardService]
  },
  {
    path: 'configuracoes/cadastro/especialidade',
    component: EspecialidadeComponent,
    canActivate: [GuardService]
  },
  {
    path: 'configuracoes/cadastro/operadora',
    component: OperadoraComponent,
    canActivate: [GuardService]
  },
  {
    path: 'configuracoes/cadastro/tipo-plano-saude',
    component: TipoPlanoSaudeComponent,
    canActivate: [GuardService]
  },
  {
    path: 'configuracoes/cadastro/tipo-contato',
    component: TipoContatoComponent,
    canActivate: [GuardService]
  },
  {
    path: 'configuracoes/cadastro/tipo-exame',
    component: TipoExameComponent,
    canActivate: [GuardService]
  },
  {
    path: 'configuracoes/cadastro/tipo-medicamento',
    component: TipoMedicamentoComponent,
    canActivate: [GuardService]
  },
  {
    path: 'configuracoes/cadastro/exame',
    component: ExameComponent,
    canActivate: [GuardService]
  },
  {
    path: 'configuracoes/cadastro/medicamento',
    component: MedicamentoComponent,
    canActivate: [GuardService]
  },
  {
    path: 'configuracoes/medicos',
    component: MedicoComponent,
    canActivate: [GuardService]
  },
  {
    path: 'medico/perfil/:codigo',
    component: PerfilMedicoComponent,
    canActivate: [GuardService]
  },
  {
    path: 'consultas/agendamentos',
    component: ConsultaComponent,
    canActivate: [GuardService]
  },
  {
    path: 'consultas/atendimento/:codigo',
    component: AtendimentoConsultaComponent,
    canActivate: [GuardService]
  },
  {
    path: 'consultas/atendimento',
    component: PreAtendimentoConsultaComponent,
    canActivate: [GuardService]
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})
export class AppRouterModule {

}
