
export class UsuarioModel {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public idusuario?: number,
        public rol?: string ,
         public img?: string,
         public estadoUsuario?: number,
         public googlebol?: number
         
         ) {
        
    }
}