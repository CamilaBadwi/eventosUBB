import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { Router } from '@angular/router';
import { UnidadService, UserService } from '../../../servicios/servicio.index';
import { global } from '../../../servicios/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unidades-ver',
  templateUrl: './unidades-ver.component.html',
  styleUrls: ['./unidades-ver.component.css'],
  providers: [UnidadService]
})
export class UnidadesVerComponent implements OnInit {

  public unidades;
  public subUnidades;
  public cantidadUnidades;
  public cantidadSubUnidades;
  public idPerfil;
  public identity;
  public idUsuario;
  public url;

  //Data sorting para unidad
  displayedColumns: string[] = ['created_at', 'nombreUnidad', 'encargado', 'sede', 'logoUnidad', 'editUnidad', 'deleteUnidad'];
  dataSource;
  filtrar: string;

  //Data sorting para sub unidad
  displayedColumns2: string[] = ['created_at', 'nombreUnidad', 'encargado', 'sede', 'logoUnidad'];
  dataSource2;
  filtrar2: string;

  constructor( private unidadService: UnidadService, public paginatorSettings: MatPaginatorIntl,
    private userService: UserService, private router: Router ) {
    this.identity = this.userService.getIdentity();
    this.url = global.url;
  }

  @ViewChild(MatSort) sort: MatSort; //ordenar datos de la tabla
  @ViewChild(MatPaginator) paginator: MatPaginator; //paginación de la tabla

  ngOnInit() {
    this.getIdUsuario();
    this.getPerfil();
    this.getUnidades();
    this.getSubUnidades();
    this.paginadorSettings();
  }

  getUnidades() {
    this.unidadService.getUnidades().subscribe(
      response => {
        console.log(response);
        this.cantidadUnidades = response.unidades.length;
        this.dataSource = new MatTableDataSource(response.unidades);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(<any>error);
      })
  }

  getSubUnidades() {
    this.unidadService.getSubUnidades(this.idUsuario).subscribe(
      response => {
        console.log(response);
        this.cantidadSubUnidades = response.subUnidad.length;
        this.dataSource2 = new MatTableDataSource(response.subUnidad);
        this.dataSource2.sort = this.sort;
        this.dataSource2.paginator = this.paginator;
      }, error => {
        console.log(<any>error);
      })
  }

  editarUnidad(id) {
    console.log('Dentro del editar unidad con el id ' + id);
    this.router.navigate(['/editarUnidad/'+id]);
  }

  eliminarUnidad(id) {
    console.log('Dentro del eliminar unidad con el id ' + id);
    Swal.fire({
      title: '¿Quiere eliminar esta unidad?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar unidad',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.unidadService.deleteUnidad(id).subscribe(
          response => {
            if (response.code == 200) {
              this.getUnidades();
              Swal.fire('Unidad eliminada', '', 'success')
            }
          }, error => {
            console.log(<any>error);
          })
      }
    })
  }

  // Asignar a la variable idPerfil el perfil del usuario activo
  getPerfil() {
    this.idPerfil = this.identity.perfil_idPerfil;
  }

  getIdUsuario() {
    if (!this.identity.id) {
      this.idUsuario = this.identity.sub;
    } else {
      this.idUsuario = this.identity.id;
    }
  }

  paginadorSettings() {
    this.paginatorSettings.itemsPerPageLabel = 'Elementos por página';
    this.paginatorSettings.previousPageLabel = 'Página anterior';
    this.paginatorSettings.nextPageLabel = 'Página siguiente';
  }

  limpiarBuscador() {
    this.filtrar = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.filtrar.trim().toLowerCase();
  }

}
