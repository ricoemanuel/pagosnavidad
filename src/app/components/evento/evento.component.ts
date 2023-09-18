import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {
  id: string | null;
  evento:any
  modalRef?: BsModalRef;
  constructor(private aRoute: ActivatedRoute, private firebase:FirebaseService,private modalService: BsModalService){
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }
  async ngOnInit(): Promise<void> {
    if(this.id){
      this.evento=await this.firebase.getevento(this.id)
      this.evento.zonas.forEach((zona:any) => {
        zona.precioZona=parseInt(zona.precioZona)
      });
    }
  }
  openModal(template: TemplateRef<any>) {

    
    this.modalRef = this.modalService.show(template);


  }

}
