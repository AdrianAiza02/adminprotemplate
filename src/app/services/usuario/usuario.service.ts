import { Injectable } from '@angular/core';


// modelo
import { UsuarioModel } from '../../models/usuario.model';

// para trabajar con http
import { HttpClient, HttpHeaders } from '@angular/common/http';

// URL DE CONFIGURACION
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //para ver si esta autentificacdo
  usuario: UsuarioModel;
  token: string;

  constructor(public http: HttpClient, public router: Router, public _uploadArchivo: SubirArchivoService) {
    this.cargarStorage();
    
  }

  estaLogueado(){

     return ( this.token.length > 5) ? true : false;
  }
  estaLogueadoChild(){
    let tokenChild = localStorage.getItem('token');
    return ( tokenChild) ? true : false;
 }

  cargarStorage(){
    //implementar id?¿?¿?¿
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
    
  }

  loginGoogle(token: string){
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token}).pipe(
      map( (resp: any) => {
        this.setLocalStorageParams(resp.idUsuario, resp.token, resp.usuario);
        return true;
      })
    );
  }

  login(usuario: UsuarioModel, recordar: boolean = false) {
    const url = URL_SERVICIOS + '/login';

    if (recordar) {
      localStorage.setItem('email',usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(url, usuario).pipe(
        map( (resp: any) => {
          const usuarioAux: UsuarioModel = resp.usuario[0];
          this.setLocalStorageParams(resp.idUsuario,resp.token,usuarioAux);
          return true;
        })
      );

  }
  crearUsuario(usuario: UsuarioModel) {
      const url = URL_SERVICIOS + '/usuario';

      return this.http.post(url, usuario);

  }

  actualizarUsuario( usuario: UsuarioModel){
    const url = URL_SERVICIOS + '/usuario/' + usuario.idusuario;
    const headers = new HttpHeaders().set('authorization', this.token);
    return this.http.put(url, usuario, {headers}).pipe(
      map ( (resp:any) => {
        this.setLocalStorageParams(usuario.idusuario.toString(), this.token, usuario);
        return true;
      })
    );
  }

  cambiarImagen(file: File, id: string){
    
    
    this._uploadArchivo.subirArchivo(file,'usuario',id,this.token)
                  .then( resp => {
                    console.log(resp);
                    //asignar desde bd ME FALTA ESTO
                   
                    this.setLocalStorageParams(id,this.token,this.usuario);
                  })
                  .catch( resp => {
                    console.log(resp);
                  });

  }

  private setLocalStorageParams(id: string, token: string, usuario: UsuarioModel) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token= token;
  }



}
