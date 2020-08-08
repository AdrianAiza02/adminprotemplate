import { Injectable } from '@angular/core';
import {  Router, CanActivateChild} from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ChildGuardsGuard implements CanActivateChild {
  constructor(public _usuarioService: UsuarioService, public router: Router){

  }
  
  canActivateChild() {
    if (this._usuarioService.estaLogueadoChild()) {
      //console.log(this._usuarioService.estaLogueado());
      //console.log('paso por el guard hijo');
      return true;
    }
    else{
      //console.log('bloqueado por el guard hijo');
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
