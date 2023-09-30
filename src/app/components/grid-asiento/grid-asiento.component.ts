import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-grid-asientos',
  templateUrl: './grid-asiento.component.html',
  styleUrls: ['./grid-asiento.component.scss']
})
export class GridAsientoComponent implements OnInit {
  spinner: boolean = true
  @Input() zonaSeleccionada!: string
  @Input() labels!: string[]
  labelsA!: string[]
  is: any[] = []
  js: any[] = []
  estado: string = "inexistente"
  evento: string = ""
  zona = { 'hexaColor': 'white', 'nombreZona': 'libre' }
  @Input() matriz: any[] = []
  @Output() enviarAsientos = new EventEmitter<any>();
  @Output() borrarAsiento = new EventEmitter<any>();
  @Output() cerrarPopUpA = new EventEmitter<any>();
  constructor(private asientoService: FirebaseService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.labelsA = [...this.labels]
    this.route.params.subscribe(params => {
      this.evento = params['id'];
    });

    this.is = this.Array(this.matriz.length)
    this.js = this.Array(this.matriz[0].length)


  }

  Array(number: number): number[] {
    let array: number[] = []
    for (let i = 0; i < number; i++) {
      array.push(0)
    }
    return array
  }
  back() {
    this.router.navigate(['eventos'])
  }

  agregarLista(information: any) {
    this.enviarAsientos.emit(information)
  }
  borrarLista(information: any) {
    this.borrarAsiento.emit(information)
  }
  cerrarPopUp(event: any) {
    this.cerrarPopUpA.emit()
  }

}
