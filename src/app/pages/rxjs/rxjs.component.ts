import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry,map, filter} from 'rxjs/operators';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit,OnDestroy {
 
    subscription: Subscription;
 
    constructor() { 

    
    
    //subscribe tienen 3 llamadas
    //1 cuando recibo informacion cuando recibo algo del next o string de datos, del gran monton de cosas q emite el observado
    //2 error 
    //3 no recibe ningun parametro, es cuando termina
    this.subscription=this.regresaObservable()
    .subscribe( 
      data => console.log("subs",data),
      error => console.error("Error en el obs" , error),
      () => console.log("El observador termino")
    );

  }

  ngOnDestroy(): void {
    console.log("la pagina se va a cerrar");
    this.subscription.unsubscribe();
   }
 
  ngOnInit(): void {
  }

  regresaObservable() : Observable<any>{
    return new Observable( (observer : Subscriber<any>) => {

      let contador = 0;
      let intervalo = setInterval(() => {
        contador++;

        //salida como objeto
        const salida = {
          valor: contador
        }

        observer.next(salida);//los observables trabajan con una lidea de dato, este observable notificara mediante el next cada vez que informacion llegue 
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if (contador === 2) {
        //   //clearInterval(intervalo);
        //   observer.error("auxilio");
        // }
      },1000);
    }).pipe(
      map( resp =>  resp.valor),
      filter( ( valor, index) => {
        //console.log("Filter", valor , index);
        if ((valor % 2 ) === 1) {
          //impar
          return true;
        } else{
          return false;
        }
      })
    );
  }

}
