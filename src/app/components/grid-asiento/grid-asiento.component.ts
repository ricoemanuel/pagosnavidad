import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-grid-asientos',
  templateUrl: './grid-asiento.component.html',
  styleUrls: ['./grid-asiento.component.scss']
})
export class GridAsientoComponent implements OnInit,AfterViewInit{
  spinner: boolean = true
  @Input() zonaSeleccionada!:string
  is:any[]=[]
  js:any[]=[]
  estado:string="inexistente"
  evento:string=""
  zona={'hexaColor':'white','nombreZona':'libre'}
  matriz:any[]=[]
  @Output() enviarAsientos = new EventEmitter<any>();
  constructor(private asientoService: FirebaseService,private route: ActivatedRoute,private router: Router){}
  ngAfterViewInit(): void {
    this.spinner=false
  }
  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.evento = params['id'];
    });
    let evento=await this.asientoService.getevento(this.evento)
    if(evento!=undefined){
      evento['zonas'].forEach((element: { [x: string]: any; }) => {
        localStorage.setItem(element['nombreZona'],'0')
        
      });
      this.is=this.Array(evento["filas"])
      this.js=this.Array(evento["columnas"])
      for(let i=0;i<evento["filas"];i++){
        let array:any[]=[]
        for(let j=0;j<evento["columnas"];j++){
          array.push(false)
        }
        this.matriz.push(array)
      }
      this.asientoService.getAsientosByEventoAndZona(this.evento,this.zonaSeleccionada).subscribe(res=>{
        res.forEach((asiento:any)=>{
          this.matriz[asiento.fila][asiento.columna]=asiento
        })
      })
    }
    
    
  }

  Array(number:number):number[]{
    let array:number[]=[]
    for (let i=0;i<number;i++){
      array.push(0)
    }
    return array
  }
  back(){
    this.router.navigate(['eventos'])
  }
  
  agregarLista(information:any){
    this.enviarAsientos.emit(information)
  }
  
}
