import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { UsuarioModel } from '../models/usuario.model';

declare function init_pluggins();
declare const gapi: any; //suponemos q existe


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  //google
  auth2: any;
  constructor( public router: Router, public _usuarioService : UsuarioService ) { }

  ngOnInit(): void {
    init_pluggins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }
  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '719523883721-4rckfl34urq8tv80oa40se9bjgp9h11i.apps.googleusercontent.com',
        scope: 'profile'
      });
      this.attachSignIn( document.getElementById('btnGoogle'));
    });
  }

  attachSignIn( element){
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      //const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      
      //aca ya estamos conectados
      this._usuarioService.loginGoogle(token)
            .subscribe( () => window.location.href = '#/dashboard');
    });
  }


  ingresar(forma : NgForm){

    //console.log(forma.valid);
    //console.log(forma.value);
    ////this.router.navigate(['/dashboard']);
    if (forma.invalid) {
      return ;
    }
    const usuario = new UsuarioModel(null,forma.value.email,forma.value.password);
    this._usuarioService.login(usuario,forma.value.recuerdame)
                        .subscribe( correcto => this.router.navigate(['/dashboard']));

    


  }

}
