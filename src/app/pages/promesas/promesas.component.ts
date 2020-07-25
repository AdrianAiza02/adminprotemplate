import { Component, OnInit } from '@angular/core';
import { resolve, reject } from 'q';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {
//resolve cuando todo sale bien
//reject cuando todo sale mal
  constructor() { 
    
    //salida cuando la promesa es resulta y cuando sucede un error 
    this.contar3segundos().then(
      mensaje => console.log("Termino",mensaje)
    )
    .catch( error =>  console.error("Error en la promesa",error));

  }

  ngOnInit(): void {
  }

  contar3segundos() : Promise<boolean>{

    //inicio promesa
    return new Promise( (resolve,reject) => {
      let contador = 0;
      let intervalo = setInterval( () => {

      contador+=1;
      console.log(contador);
      if (contador === 3) {
        resolve(true);
        //reject('Simplemente un error ');
        clearInterval(intervalo);
      }
      }, 1000);
    });
    //fin promesa
  }

}
