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

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TipoPlanoSaudeComponent } from './componentes/modulos/cadastro/tipoPlanoSaude/tipoplanosaude.component';
import { TipoExameComponent } from './componentes/modulos/cadastro/tipoExame/tipoexame.component';
import { ExameComponent } from './componentes/modulos/cadastro/exame/exame.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'pacientes',
    component: PacientesComponent
  },
  {
    path: 'paciente/perfil/:codigo',
    component: PerfilComponent
  },
  {
    path: 'configuracoes/cadastro/especialidade',
    component: EspecialidadeComponent
  },
  {
    path: 'configuracoes/cadastro/operadora',
    component: OperadoraComponent
  },
  {
    path: 'configuracoes/cadastro/tipo-plano-saude',
    component: TipoPlanoSaudeComponent
  },
  {
    path: 'configuracoes/cadastro/tipo-contato',
    component: TipoContatoComponent
  },
  {
    path: 'configuracoes/cadastro/tipo-exame',
    component: TipoExameComponent
  },
  {
    path: 'configuracoes/cadastro/exame',
    component: ExameComponent
  },
  {
    path: 'configuracoes/medicos',
    component: MedicoComponent
  },
  {
    path: 'medico/perfil/:codigo',
    component: PerfilMedicoComponent
  },
  {
    path: 'agendamentos/consultas',
    component: ConsultaComponent
  }

];

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
