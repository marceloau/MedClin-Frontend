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
    path: 'perfil/:codigo',
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
  }

];

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
