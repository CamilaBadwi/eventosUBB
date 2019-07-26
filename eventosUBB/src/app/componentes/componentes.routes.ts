import { Routes, RouterModule } from '@angular/router';

import { ComponentesComponent } from './componentes.component';

import { LoginComponent } from '../login/login.component';
import { EditLoginComponent } from '../componentes/edit-login/edit-login.component';

import { InicioComponent } from './inicio/inicio.component';

import { EventosDetallesComponent } from './eventos/eventos-detalles/eventos-detalles.component';
import { EventosEditarComponent } from './eventos/eventos-editar/eventos-editar.component';
import { EventosMisEventosComponent } from './eventos/eventos-mis-eventos/eventos-mis-eventos.component';
import { EventosCrearComponent } from './eventos/eventos-crear/eventos-crear.component';
import { EventosDetallesPublicComponent } from './eventos/eventos-detalles-public/eventos-detalles-public.component';

import { LoginGuard } from '../servicios/guards/login.guard';
import { UnidadesCrearComponent } from './unidades/unidades-crear/unidades-crear.component';
import { UnidadesVerComponent } from './unidades/unidades-ver/unidades-ver.component';

const componentesRoutes: Routes = [
    { path: '', component: LoginComponent, data: { titulo: 'Iniciar sesión'}},
    {
        path: '',
        component: ComponentesComponent,
        canActivate: [ LoginGuard ],
        children: [
            { path: 'inicio', component: InicioComponent , data: { titulo: 'Inicio' } },
            { path: 'eventoDetalle/:id', component: EventosDetallesComponent, data: { titulo: 'Detalles evento' } },
            { path: 'misEventos', component: EventosMisEventosComponent, data: { titulo: 'Mis eventos' } },
            { path: 'crearEvento', component: EventosCrearComponent, data: { titulo: 'Crear evento' } },
            { path: 'eventosEditar/:id/:idUsuario', component: EventosEditarComponent, data: { titulo: 'Editar evento' } },
            { path: 'editLogin', component: EditLoginComponent, data: { titulo: 'Editar Perfil' }  },
            { path: 'crearUnidad', component: UnidadesCrearComponent, data: { titulo: 'Crear unidad' } },
            { path: 'verUnidades', component: UnidadesVerComponent, data: { titulo: 'Ver unidades' } },

            // Para visualizar los detalles del evento (vista para participantes)
            { path: 'eventoDetallePublic', component: EventosDetallesPublicComponent, data: { titulo: 'Detalles evento' } }

        ]
    }
];
// Rutas hijas
export const COMPONENTES_ROUTES = RouterModule.forChild(componentesRoutes);
