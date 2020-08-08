import { Pipe, PipeTransform } from "@angular/core";
import { URL_SERVICIOS } from "../config/config";

@Pipe({
  name: "imagen",
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/imagen';
    //si tiene algo de https en el atributo
    if (img === null) {
      return `${url}/usuario/xxx`;
    } else {
      if (img.indexOf('https') >= 0) {
        return img;
      }
      if (!img) {
        return `${url}/usuario/xxx`;
      }
  
      switch (tipo) {
        case 'usuario':
          url += '/usuario/' + img;
          break;
  
        case 'medico':
          url += '/medico/' + img;
          break;
  
        case 'hospital':
          url += '/hospital/' + img;
          break;
  
        default:
          console.log('tipo de imagen no existe, usuario, medicos, hospital');
          url +=  '/usuario/xxx';
          break;
      }
      return url;
    }
    
  }
}
