import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styles: []
})
export class ProfilesComponent implements OnInit {

  usuario: UsuarioModel;

  //imagenes
  imagenSubir: File;

  //vista previa
  imagenTemp: string;
  constructor( public _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit(): void {
  }
  seleccionImagen( archivo: File){

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire({
        title: 'Solo se aceptan imagenes',
        text: 'Archivo seleccionado no es una imagen',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      this.imagenSubir = null;
      return ;
    }
    this.imagenSubir = archivo;
    //javascript nativo
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp =  reader.result.toString();
    


  }
  cambiarImagen(){
      this._usuarioService.cambiarImagen(this.imagenSubir,this.usuario.idusuario.toString());//MENSAJE DE IMAGEN ACTUALIZADA CORRECTAMENTE
  }

  guardar(usuario: UsuarioModel){
    this.usuario.nombre = usuario.nombre;
    
    
    if (this.usuario.googlebol === null) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario).subscribe( resp => {
      Swal.fire({
        title: 'El usuario se ha actualizado correctamente',
        text: this.usuario.nombre,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    });

  }

}
