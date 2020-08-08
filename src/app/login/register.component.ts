import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { UsuarioModel } from '../models/usuario.model';
import { Router } from '@angular/router';


declare function init_pluggins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {


  formulario: FormGroup;

  constructor(public _UsuarioService: UsuarioService, public router: Router) { }

  validarContrasenias( campo1: string, campo2: string){
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
          return null;
      }

      //error q envide q el formulario sea valido
      return {
        validarcontrasenias: true
      };
    }
  }

  ngOnInit(): void {
    init_pluggins();
    this.formulario = new FormGroup({
      nombre : new FormControl(null, Validators.required),
      email : new FormControl(null, [Validators.required,Validators.email]),
      password : new FormControl(null, Validators.required),
      password2 : new FormControl(null, Validators.required),
      condiciones : new FormControl(false),
    }, { validators : this.validarContrasenias('password','password2')});


    //lenar de forma aleatoria los campos
    this.formulario.setValue({
      nombre: 'adrian',
      email: 'test@gmail.com',
      password: '123456',
      password2: '123456',
      condiciones : true
    });
  }

  registrarUsuario(){

    if (this.formulario.invalid) {
      return;
    }
    if (!this.formulario.value.condiciones) {
      Swal.fire({
        title: 'Acepta',
        text: 'Debe aceptar los terminos de condiciones',
        icon: 'info',
        confirmButtonText: 'Ok'
      });
    }
    let usuario = new UsuarioModel(
      this.formulario.value.nombre,
      this.formulario.value.email,
      this.formulario.value.password
    );

    this._UsuarioService.crearUsuario(usuario).subscribe( data => {
        Swal.fire({
          title: 'Usuario',
          text: 'El usuario se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.router.navigate(['/login']);
    });
    
    //console.log("formulario valido???", this.formulario.valid);
    //console.log("valores formulario", this.formulario.value);
  }

}
