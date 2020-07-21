import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() dataArreglo:number[]=[];
  @Input() labelsArreglo:string[] = [];
  @Input() chartTypeArreglo:string = '';
  @Input() leyenda:string;

  constructor() { }

  ngOnInit(): void {
  }

}
