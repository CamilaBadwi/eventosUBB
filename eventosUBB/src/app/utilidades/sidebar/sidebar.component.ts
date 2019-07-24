import { Component, OnInit } from '@angular/core';
import { UserService, SidebarService } from '../../servicios/servicio.index';
import {global} from '../../servicios/global'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [ UserService, SidebarService ]
})
export class SidebarComponent implements OnInit {

  public identity;
  public token;
  public url;

  public idPerfil; //perfil del usuario que está activo

  constructor( public _sidebar: SidebarService, public userService: UserService ) { 
    this.identity = this.userService.getIdentity();
    this.url = global.url;
  }

  ngOnInit() {

    this.idPerfil = this.identity.perfil_idPerfil;

  }

}
