import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  esAdmin: any
  Title!: string
  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private firebase: FirebaseService,
    private location: Location
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  async ngOnInit(): Promise<void> {
    this.esAdmin = await this.firebase.esAdmin()
    this.location.path().split('/')
    this.detectarRuta()
    
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  cerrarSesion() {
    this.firebase.cerrarSesion()
    localStorage.clear()
    localStorage.setItem("logot", "true")
    window.location.reload()
  }
  detectarRuta(){
   let ruta=this.router.url.split('/')
   this.asignarRuta(ruta)
   this.detectarCambioRuta().subscribe((segments: string[]) => {
    let ruta=segments
    this.asignarRuta(ruta)
  });
   
  }

  detectarCambioRuta(): Observable<string[]> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url.split('/'))
    );
  }
  asignarRuta(ruta:string[]):void{
    if(ruta.length===2){
      ruta[1]==='registrarproducto'?this.Title='Registrar producto':this.Title=ruta[1]
      ruta[1]==='registrarcliente'?this.Title='Registrar cliente':this.Title=ruta[1]
      ruta[1]==='registrarproveedor'?this.Title='Registrar proveedor':this.Title=ruta[1]
     }else{
      ruta[2]==='registrarempresa'?this.Title='Registrar empresa':this.Title=ruta[2]
     }
  }
}
