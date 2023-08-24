import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Producto } from '../entities/producto';
import { Cliente } from '../entities/cliente';
@Injectable({
  providedIn: 'root'
})
export class JsonFormatterService {

  constructor(private Firebase: FirebaseService) { }

  obtenerProductos() {
    let clientes=[
      {"nombreTercero":"95/24 COLOMBIA S.A.S.","tipoId":"NIT","Id":"900937674","digitoVerificacion":"0","direccion":"Autopista Medellín Km 5 Parque Industrial Logika II","ciudad":"Medellín","telefono":"604-8966113-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"A LA FERRETERÍA FERRETERÍA","tipoId":"Cédula de ciudadanía","Id":"21746909","digitoVerificacion":"8","direccion":"calle 96#70-20","ciudad":"Medellín","telefono":"604-3233415707-","nombreContacto":"A LA FERRETERÍA FERRETERÍA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"A.I.C.","tipoId":"NIT","Id":"817001773","digitoVerificacion":"","direccion":"Cra. 36c #5B2-32","ciudad":"Cali","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Abel Emilio Fernandez Torres","tipoId":"Cédula de ciudadanía","Id":"70927614","digitoVerificacion":"","direccion":"CALLE 72 # 39-53 MANRIQUE","ciudad":"Medellín","telefono":"-3104695562-","nombreContacto":"Abel Emilio Fernandez Torres","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"AC DISTRIBUCIONES","tipoId":"NIT","Id":"1017195007","digitoVerificacion":"0","direccion":"cra53#50-30 local127","ciudad":"Medellín","telefono":"604-3226221762-","nombreContacto":"AC DISTRIBUCIONES","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ACH Colombia S.A.","tipoId":"NIT","Id":"830078512","digitoVerificacion":"0","direccion":"Tv. 23 # 97-73","ciudad":"Bogotá","telefono":"-7444686-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ACINOX S.A","tipoId":"NIT","Id":"800240061","digitoVerificacion":"0","direccion":"CLL 41 # 50-49","ciudad":"Medellín","telefono":"604-2610061-","nombreContacto":"ISABEL","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Administradora de Fondos de Pensiones y Cesantía Protección S.A.","tipoId":"NIT","Id":"800138188","digitoVerificacion":"","direccion":"Calle 49 No. 63 - 100","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ADRIAN CALLE","tipoId":"Cédula de ciudadanía","Id":"1020456","digitoVerificacion":"4","direccion":"PARQUE PRINCIPAL","ciudad":"Anorí","telefono":"604-3216174417-","nombreContacto":"ADRIAN CALLE","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ADRIANA LONDOÑO","tipoId":"Cédula de ciudadanía","Id":"22118883","digitoVerificacion":"","direccion":"","ciudad":"Bello","telefono":"","nombreContacto":"ADRIANA LONDOÑO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"AEROPINTURAS","tipoId":"NIT","Id":"1017217507","digitoVerificacion":"8","direccion":"CLL40A #53-66","ciudad":"Bello","telefono":"604-6044734073-","nombreContacto":"AEROPINTURAS AEROPINTURAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"AGENCIA LA NUEVA","tipoId":"NIT","Id":"3588640","digitoVerificacion":"9","direccion":"CORREGIMIENTO PUERTO NUS CL 10# 8-57","ciudad":"Maceo","telefono":"604-3116014475-","nombreContacto":"AGENCIA LA NUEVA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"AGRO HELENA LA SUSANA","tipoId":"NIT","Id":"1037370773","digitoVerificacion":"7","direccion":"corregimiento la susana","ciudad":"Maceo","telefono":"604-312727029-","nombreContacto":"AGRO CAMPO LA SUSANA * Razón social","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"AGRO MACEO","tipoId":"Cédula de ciudadanía","Id":"21863164","digitoVerificacion":"9","direccion":"cra30#29-14","ciudad":"Maceo","telefono":"604-3116260591-","nombreContacto":"AGRO MACEO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"AGROCAFE MARIN","tipoId":"NIT","Id":"901089577","digitoVerificacion":"9","direccion":"Calle 51#48=82","ciudad":"Amagá","telefono":"604-3202238428-000","nombreContacto":"HECTOR ALEXANDER","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"AGROFILTER ANTIOQUIA SAS","tipoId":"NIT","Id":"811017552","digitoVerificacion":"0","direccion":"CLL 44 N58-38","ciudad":"Bello","telefono":"604-3184419507-","nombreContacto":"AGROFILTER ANTIOQUIA SAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"AGROINDUSTRIA BORACAY","tipoId":"NIT","Id":"9015691586","digitoVerificacion":"0","direccion":"CALLE 84 42 114","ciudad":"Itagui","telefono":"604-3176365182-","nombreContacto":"SANTA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"AGROPECUARIA GAMARCK AGROPECUARIA GAMARCK","tipoId":"Cédula de ciudadanía","Id":"71747625","digitoVerificacion":"8","direccion":"calle102A#82ff-57","ciudad":"Bello","telefono":"604-2676287-","nombreContacto":"AGROPECUARIA GAMARCK AGROPECUARIA GAMARCK","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Alberto Gomez Zapata","tipoId":"Cédula de ciudadanía","Id":"7245564","digitoVerificacion":"","direccion":"ANORI - BARRIO LOS ANGELES","ciudad":"Anorí","telefono":"-3105094269-","nombreContacto":"Alberto Gomez Zapata","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Alfa","tipoId":"NIT","Id":"860503617","digitoVerificacion":"","direccion":"Av. calle 24A #59","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Aliansalud","tipoId":"NIT","Id":"830113831","digitoVerificacion":"0","direccion":"Cr 8 38 - 31","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Alirio de jesus Valdes Garcia","tipoId":"Cédula de ciudadanía","Id":"8070705","digitoVerificacion":"","direccion":"ANORI - PARQUE PRINCIPAL","ciudad":"Anorí","telefono":"--","nombreContacto":"Alirio de jesus Valdes Garcia","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ALMACEN CORDOBA","tipoId":"NIT","Id":"71787248","digitoVerificacion":"5","direccion":"CALLE45#54-54","ciudad":"Medellín","telefono":"604-5120733-","nombreContacto":"ALMACEN CORDOBA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ALMACEN Y FERRETERÍA PEDRO NEL OSPINA","tipoId":"Cédula de ciudadanía","Id":"70034086","digitoVerificacion":"4","direccion":"CL salgar # 50 26","ciudad":"Santa Bárbara","telefono":"-3146812259-","nombreContacto":"Alberto Ospina Ospina","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Ambuq Ars","tipoId":"NIT","Id":"818000140","digitoVerificacion":"","direccion":"Cra. 51 #79","ciudad":"Barranquilla","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ANA MARIA JIMENEZ","tipoId":"Cédula de ciudadanía","Id":"22193823","digitoVerificacion":"2","direccion":"CRA48#51-49","ciudad":"Bello","telefono":"604-3114003455-","nombreContacto":"ANA MARIA JIMENEZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Anas Wayuu","tipoId":"NIT","Id":"839000495","digitoVerificacion":"","direccion":"Carrera 16 No. 16 - 31","ciudad":"Riohacha","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ANCLAJES Y TORNILLOS SAS","tipoId":"NIT","Id":"900587126","digitoVerificacion":"","direccion":"calle 41 # 45 - 43","ciudad":"Medellín","telefono":"-3218725162-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Andres Alexander Zapata","tipoId":"Cédula de ciudadanía","Id":"71791730","digitoVerificacion":"","direccion":"","ciudad":"Segovia","telefono":"--","nombreContacto":"Andres Alexander Zapata","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ANDRES FELIPE GIRALDO YEPES","tipoId":"Cédula de ciudadanía","Id":"72274773","digitoVerificacion":"2","direccion":"Ccalle48#55-11","ciudad":"Medellín","telefono":"604-5124471-","nombreContacto":"ANDRES FELIPE GIRALDO YEPES","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ANDRES SUAREZ","tipoId":"Cédula de ciudadanía","Id":"980000000","digitoVerificacion":"6","direccion":"","ciudad":"Bello","telefono":"604--","nombreContacto":"ANDRES SUAREZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"APARCAMOTOS LA CANDELARIA","tipoId":"Cédula de ciudadanía","Id":"9008611014","digitoVerificacion":"2","direccion":"CALLE 48#54-56","ciudad":"Medellín","telefono":"604-3242952656-","nombreContacto":"APARCAMOTOS LA CANDELARIA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Aportes en Línea S.A.","tipoId":"NIT","Id":"900147238","digitoVerificacion":"2","direccion":"Carrera 13 No 26 A - 47","ciudad":"Bogotá","telefono":"-3078333-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"AQA GROUP S.A.S","tipoId":"NIT","Id":"900992162","digitoVerificacion":"5","direccion":"CR 51#40-80","ciudad":"Medellín","telefono":"604-3222010-","nombreContacto":"JORGE CORREA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Arley Uñate","tipoId":"Cédula de ciudadanía","Id":"1035128245","digitoVerificacion":"","direccion":"ANORI-PARQUE PRINCIPAL","ciudad":"Anorí","telefono":"--","nombreContacto":"Arley Uñate","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Ars Convida","tipoId":"NIT","Id":"899999107","digitoVerificacion":"","direccion":"Carrera 58 No. 9-97","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Arus S.A","tipoId":"NIT","Id":"800042471","digitoVerificacion":"8","direccion":"Cl. 19 #43g-155","ciudad":"Bogotá","telefono":"-7424488-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Asmet Salud","tipoId":"NIT","Id":"900935126","digitoVerificacion":"","direccion":"Cra. 7 #35-23","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Asofondos de Colombia","tipoId":"NIT","Id":"800226061","digitoVerificacion":"","direccion":"Cl 72 8-24 Of 901","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Asopagos S A","tipoId":"NIT","Id":"900319291","digitoVerificacion":"2","direccion":"calle 31 No. 13 51","ciudad":"Bogotá","telefono":"-4875111-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"AUTOS CAMPEROS","tipoId":"NIT","Id":"900518359","digitoVerificacion":"8","direccion":"cra59#44a45","ciudad":"Medellín","telefono":"604-5113691-","nombreContacto":"AUTOS CAMPEROS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Banco Agrario de Colombia S.A.","tipoId":"NIT","Id":"800037800","digitoVerificacion":"8","direccion":"Cra. 8 No. 15-43","ciudad":"Bogotá","telefono":"-5948500-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Banco Caja Social S.A.","tipoId":"NIT","Id":"860007335","digitoVerificacion":"4","direccion":"Cra. 7 No. 77-65","ciudad":"Bogotá","telefono":"-3077060-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Banco Citibank","tipoId":"NIT","Id":"860051135","digitoVerificacion":"0","direccion":"0","ciudad":"Bogotá","telefono":"-6057000-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"banco comercial AV Villas s.a.","tipoId":"NIT","Id":"860035827","digitoVerificacion":"5","direccion":"Carrera 86 No. 6 - 37","ciudad":"Bogotá","telefono":"-3363199-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Banco Cooperativo Coopcentral","tipoId":"NIT","Id":"890203088","digitoVerificacion":"0","direccion":"Calle 116 No. 23-06","ciudad":"Bogotá","telefono":"-7431088-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Banco de Bogotá","tipoId":"NIT","Id":"860002964","digitoVerificacion":"","direccion":"CL 36 No 7 - 47 P 15","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Banco de occidente","tipoId":"NIT","Id":"890300279","digitoVerificacion":"","direccion":"Cr 4 7- 61","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Banco GNB Sudameris S A","tipoId":"NIT","Id":"860050750","digitoVerificacion":"1","direccion":"Cra 99 # 18 - 45","ciudad":"Bogotá","telefono":"-2750000-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Banco Pichincha","tipoId":"NIT","Id":"890200756","digitoVerificacion":"0","direccion":"Av. Américas # 42-81","ciudad":"Bogotá","telefono":"-6501050-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Banco Popular S.A.","tipoId":"NIT","Id":"860007738","digitoVerificacion":"9","direccion":"Carrera 75C #35-18","ciudad":"Bogotá","telefono":"-2040180-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Banco Procredit","tipoId":"NIT","Id":"900200960","digitoVerificacion":"0","direccion":"Cl. 39 #13a16","ciudad":"Bogotá","telefono":"-5954040-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Banco Santander","tipoId":"NIT","Id":"900628110","digitoVerificacion":"0","direccion":"Calle 93 A No. 13-24","ciudad":"Bogotá","telefono":"-7434301-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Bancolombia","tipoId":"NIT","Id":"890903938","digitoVerificacion":"8","direccion":"Cra 48 N 26 - 85 Av. Industriales; Medellín; Antioquia","ciudad":"Bogotá","telefono":"--","nombreContacto":"MARIA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"BBVA","tipoId":"NIT","Id":"860003020","digitoVerificacion":"","direccion":"Cra. 8 No. 13 42","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"BBVA Horizonte","tipoId":"NIT","Id":"800147502","digitoVerificacion":"","direccion":"","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"BOMBAS Y ACESORIOS","tipoId":"NIT","Id":"89352423","digitoVerificacion":"6","direccion":"CARRERA 50 42 68","ciudad":"Medellín","telefono":"604--","nombreContacto":"BOMBAS Y ACESORIOS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Brahian steban Ramos florez","tipoId":"Cédula de ciudadanía","Id":"1216727063","digitoVerificacion":"1","direccion":"cr 82 ff 100 f 22","ciudad":"Medellín","telefono":"604-3216506180-","nombreContacto":"Brahian steban Ramos florez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"CABALGATA FERRETERÍA","tipoId":"NIT","Id":"900205667","digitoVerificacion":"8","direccion":"cra48#53-75 local118","ciudad":"Bello","telefono":"604-2315600-","nombreContacto":"CABALGATA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"CACHARRERIA BOMBAY SA","tipoId":"NIT","Id":"890905695","digitoVerificacion":"2","direccion":"calle 47#52-25","ciudad":"Medellín","telefono":"604-3148799803-","nombreContacto":"CACHARRERIA BOMBAY SA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"CACHARRO Y FERRETERÍA MEKA","tipoId":"Cédula de ciudadanía","Id":"3399945","digitoVerificacion":"9","direccion":"cra59#46-16","ciudad":"Medellín","telefono":"604-5128754-","nombreContacto":"Juan Camilo Mejia Quintero","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Cafaba","tipoId":"NIT","Id":"890270275","digitoVerificacion":"5","direccion":"CALLE 49 NRO. 17-14","ciudad":"Barrancabermeja","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Cafam","tipoId":"NIT","Id":"860013570","digitoVerificacion":"3","direccion":"","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Cafamaz","tipoId":"NIT","Id":"800003122","digitoVerificacion":"","direccion":"Cra. 11 #6-80","ciudad":"Leticia","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Cafasur","tipoId":"NIT","Id":"890704737","digitoVerificacion":"","direccion":"Carrera 4 # 10 - 04","ciudad":"Espinal","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Cafesalud","tipoId":"NIT","Id":"800140949","digitoVerificacion":"6","direccion":"","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Caja_Copi","tipoId":"NIT","Id":"890102044","digitoVerificacion":"","direccion":"RA 46 # 53 - 34","ciudad":"Barranquilla","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"CajAmagá","tipoId":"NIT","Id":"891780093","digitoVerificacion":"3","direccion":"","ciudad":"Santa Marta","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Cajasai","tipoId":"NIT","Id":"892400320","digitoVerificacion":"5","direccion":"Av francisco newball 4 138","ciudad":"San Andrés","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Cajasan","tipoId":"NIT","Id":"890200106","digitoVerificacion":"1","direccion":"","ciudad":"Bucaramanga","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"CALLE VERDE","tipoId":"","Id":"3696878561","digitoVerificacion":"0","direccion":"CR 74# 68A-13","ciudad":"Itagui","telefono":"604-5986324-@604-3016747875-","nombreContacto":"CALLE VERDE","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Camara de comercio de bogota","tipoId":"NIT","Id":"860007322","digitoVerificacion":"","direccion":"Avenida Eldorado No 68D-35","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Capital Salud Eps","tipoId":"NIT","Id":"900298372","digitoVerificacion":"9","direccion":"Carrera 29 C No 73 - 23","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Capresoca","tipoId":"NIT","Id":"891856000","digitoVerificacion":"7","direccion":"Calle 7 N 19 - 34","ciudad":"Yopal","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"CARLOS ADONIS LOPEZ CAICEDO","tipoId":"Cédula de ciudadanía","Id":"1003756276","digitoVerificacion":"2","direccion":"CL 40AA59C40","ciudad":"Bello","telefono":"604-3146652334-","nombreContacto":"CARLOS ADONIS LOPEZ CAICEDO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Carlos Arturo Ramires Cardona","tipoId":"Cédula de ciudadanía","Id":"71724843","digitoVerificacion":"","direccion":"CARRERA 43A # 70SUR-142","ciudad":"Medellín","telefono":"-3126630099-","nombreContacto":"Carlos Arturo Ramires Cardona","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"CASA PICKUP SAS","tipoId":"NIT","Id":"901396659","digitoVerificacion":"","direccion":"CL 73 # 69 171","ciudad":"Medellín","telefono":"-3218025639-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Caxdac","tipoId":"NIT","Id":"860007379","digitoVerificacion":"","direccion":"Cl. 35 #7-21","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Ccf De La Guajira","tipoId":"NIT","Id":"892115006","digitoVerificacion":"5","direccion":"","ciudad":"Riohacha","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Ccf De Nariño","tipoId":"NIT","Id":"891280008","digitoVerificacion":"0","direccion":"Calle 16b 30 53","ciudad":"Pasto","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"CENCOSUD COLOMBIA S.A","tipoId":"NIT","Id":"900155107","digitoVerificacion":"1","direccion":"CRA50#23-223","ciudad":"Medellín","telefono":"604-00000-","nombreContacto":"CENCOSUD COLOMBIA S.A","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"CENTRAL CISNEROS S.A.S","tipoId":"NIT","Id":"901410795","digitoVerificacion":"4","direccion":"CALLE 20 #19-36","ciudad":"Cisneros","telefono":"604-3196261969-000","nombreContacto":"CENTRAL CISNEROS S.A.S","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"CENTRAL MAYORISTA DE ANTIOQUIA","tipoId":"NIT","Id":"800011924","digitoVerificacion":"1","direccion":"calle85#48-01","ciudad":"Medellín","telefono":"604-2854815-","nombreContacto":"CENTRAL MAYORISTA DE ANTIOQUIA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"CENTRO COMERCIAL TERMINAL DEL SUR","tipoId":"NIT","Id":"811000784","digitoVerificacion":"8","direccion":"Carrera 65 No. 8B # 91","ciudad":"Medellín","telefono":"604-4448020-","nombreContacto":"CENTRO COMERCIAL TERMINAL DEL SUR","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"CHIRYANA CHIRYANA","tipoId":"Cédula de ciudadanía","Id":"42701303","digitoVerificacion":"8","direccion":"Cr 17 # 20 33","ciudad":"Barbosa","telefono":"-3137778685-","nombreContacto":"Luz Ercilia Fonnegra Montoya","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"CINCO ESTRELLAS #1","tipoId":"NIT","Id":"98542364","digitoVerificacion":"8","direccion":"av38c#42DD-39","ciudad":"Bello","telefono":"604-3202051555-","nombreContacto":"CINCO ESTRELLAS #1","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"CITI Colfondos Pensiones y Cesantías","tipoId":"NIT","Id":"800149496","digitoVerificacion":"","direccion":"Calle 67 No. 7 - 94 Pisos 3, 6, 10, 11, 14 al PH","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Cliente Ejemplo","tipoId":"NIT","Id":"1","digitoVerificacion":"","direccion":"","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"COBRAGILITY S.A.S","tipoId":"NIT","Id":"901395768","digitoVerificacion":"0","direccion":"CRA 44 #38-11 OF 13DP13","ciudad":"Medellín","telefono":"604-3175114671-","nombreContacto":"PEDRO UNIFER","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Cofrem","tipoId":"NIT","Id":"892000146","digitoVerificacion":"","direccion":"Av. 40 #35a2","ciudad":"Villavicencio","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Cofrem","tipoId":"NIT","Id":"900930524","digitoVerificacion":"2","direccion":"Avenida 40# 35 A 19","ciudad":"Villavicencio","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Colfondos","tipoId":"NIT","Id":"800227940","digitoVerificacion":"","direccion":"Av. Cdad. de Quito #8558","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Colmena","tipoId":"NIT","Id":"800226175","digitoVerificacion":"3","direccion":"Ac 72 #10-71","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Colpatria ARP","tipoId":"NIT","Id":"860002183","digitoVerificacion":"","direccion":"Cra. 9 #74-08","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Colpensiones","tipoId":"NIT","Id":"900336004","digitoVerificacion":"","direccion":"Cra. 9 #59-43","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Colsubsidio","tipoId":"NIT","Id":"860007336","digitoVerificacion":"1","direccion":"","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Combarranquilla","tipoId":"NIT","Id":"890102002","digitoVerificacion":"","direccion":"Calle 34 44 - 63 P 4","ciudad":"Barranquilla","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comcaja","tipoId":"NIT","Id":"800231969","digitoVerificacion":"","direccion":"Carrera 12 No. 96-23.","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"COMERCIALIZADORA FERROPARTE","tipoId":"NIT","Id":"901031400","digitoVerificacion":"4","direccion":"CRR 50 CL 40-82","ciudad":"","telefono":"604-3220428-","nombreContacto":"COMERCIALIZADORA FERROPARTE","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfaboy","tipoId":"NIT","Id":"891800213","digitoVerificacion":"8","direccion":"Cra. 10 #16-81","ciudad":"Tunja","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfaca","tipoId":"NIT","Id":"891190047","digitoVerificacion":"","direccion":"Cra. 11 #1049","ciudad":"Florencia","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfacasanare","tipoId":"NIT","Id":"844003392","digitoVerificacion":"","direccion":"CARRERA 21 NO. 6-29","ciudad":"Yopal","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfacauca","tipoId":"NIT","Id":"891500182","digitoVerificacion":"","direccion":"Calle 2N No. 6A-54","ciudad":"Popayán","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfacesar","tipoId":"NIT","Id":"892399989","digitoVerificacion":"","direccion":"Cra. 9 # 16A - 48 ? 585 77 77","ciudad":"Valledupar","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfacor","tipoId":"NIT","Id":"891080005","digitoVerificacion":"","direccion":"Cra. 9 #12-01","ciudad":"Montería","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfacundi","tipoId":"NIT","Id":"860045904","digitoVerificacion":"","direccion":"Cl. 53 #10-39","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfama","tipoId":"NIT","Id":"890900841","digitoVerificacion":"","direccion":"","ciudad":"Medellín","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfamiliar","tipoId":"NIT","Id":"890101994","digitoVerificacion":"9","direccion":"Carrera 54 No. 59-167","ciudad":"Barranquilla","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfamiliar Camacol","tipoId":"NIT","Id":"890900840","digitoVerificacion":"","direccion":"Cl. 49b #63-21","ciudad":"Medellín","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfamiliar Cartagena","tipoId":"NIT","Id":"890480110","digitoVerificacion":"1","direccion":"Dg. 35 #34-62","ciudad":"Cartagena","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfamiliar Chocó","tipoId":"NIT","Id":"891600091","digitoVerificacion":"8","direccion":"Calle 23 No. 4-31","ciudad":"Quibdó","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfamiliar Huila","tipoId":"NIT","Id":"891180008","digitoVerificacion":"","direccion":"Calle 11 #5-63","ciudad":"Neiva","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfamiliar Risaralda","tipoId":"NIT","Id":"891480000","digitoVerificacion":"","direccion":"Cl. 22 #4-40","ciudad":"Pereira","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfandi","tipoId":"NIT","Id":"890303208","digitoVerificacion":"","direccion":"Carrera 23 No. 26B","ciudad":"Cali","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfanorte","tipoId":"NIT","Id":"890500516","digitoVerificacion":"","direccion":"Cl. 9 #0-25","ciudad":"Cúcuta","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfaoriente","tipoId":"NIT","Id":"890500675","digitoVerificacion":"","direccion":"Av. 2 13-75 La Playa","ciudad":"Cúcuta","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfaputumayo","tipoId":"NIT","Id":"891200337","digitoVerificacion":"8","direccion":"Cra. 16 #1045","ciudad":"Puerto Asís","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfasucre","tipoId":"NIT","Id":"892200015","digitoVerificacion":"5","direccion":"Calle 28 #25b 50","ciudad":"Sincelejo","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfatolima","tipoId":"NIT","Id":"800211025","digitoVerificacion":"1","direccion":"Av Ambalá #19-109","ciudad":"Ibagué","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfenalco","tipoId":"NIT","Id":"890900842","digitoVerificacion":"","direccion":"Cl. 75 #13-37","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfenalco Cartagena","tipoId":"NIT","Id":"890480023","digitoVerificacion":"","direccion":"Cl. 30 #50-187","ciudad":"Cartagena","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfenalco Quindío","tipoId":"NIT","Id":"890000381","digitoVerificacion":"","direccion":"Cl. 16 #152","ciudad":"Armenia","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfenalco Santander","tipoId":"NIT","Id":"890201578","digitoVerificacion":"","direccion":"Av. González Valencia 52-69","ciudad":"Bucaramanga","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfenalco Tolima","tipoId":"NIT","Id":"890700148","digitoVerificacion":"","direccion":"Cra. 5 #37","ciudad":"Ibagué","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfenalco Valle","tipoId":"NIT","Id":"890303093","digitoVerificacion":"","direccion":"Cl. 6 #6-63","ciudad":"Cali","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comfiar","tipoId":"NIT","Id":"800219488","digitoVerificacion":"","direccion":"#1 a 143  Cl. 22,","ciudad":"Arauca","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"COMISION Y DESPACHOS DE CARGA  URABA","tipoId":"NIT","Id":"8416813","digitoVerificacion":"7","direccion":"CALLE 45A#54-72","ciudad":"Medellín","telefono":"604-4075488-","nombreContacto":"COMISION Y DESPACHOS DE CARGA  URABA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Comparta","tipoId":"NIT","Id":"804002105","digitoVerificacion":"0","direccion":"Cra. 18 #32a-18","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Compensar","tipoId":"NIT","Id":"860066942","digitoVerificacion":"7","direccion":"Ak 68 #49A 47","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Confamiliares","tipoId":"NIT","Id":"890806490","digitoVerificacion":"5","direccion":"Av. Paralela #50a50","ciudad":"Manizales","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"CONSTRUCTORA Y DEPOSITO CIVILAGRO SAS","tipoId":"NIT","Id":"901582069","digitoVerificacion":"2","direccion":"Cl 10 # 8 120","ciudad":"Barbosa","telefono":"-3504734849-","nombreContacto":"Andrea Cardona","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Construsantana Construsantana","tipoId":"Cédula de ciudadanía","Id":"71215119","digitoVerificacion":"","direccion":"Cl 45 # 58-63","ciudad":"Bello","telefono":"-3013762578-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"CONSULTORES GEOESTRUCTURAL SAS","tipoId":"NIT","Id":"901487969","digitoVerificacion":"1","direccion":"ANORI - PARQUE PRINCIPAL","ciudad":"Anorí","telefono":"604-8350027-","nombreContacto":"Diego Alejandro Salazar Gomez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Consumidor Final","tipoId":"Cédula de ciudadanía","Id":"222222222222","digitoVerificacion":"","direccion":"","ciudad":"","telefono":"","nombreContacto":"Consumidor Final","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Coomeva","tipoId":"NIT","Id":"805000427","digitoVerificacion":"","direccion":"C 102 n 14 a 40","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Coomeva","tipoId":"NIT","Id":"900406150","digitoVerificacion":"5","direccion":"C 102 n 14 a 40","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Cooperativa medica del valle y de profesionales de colombia coomeva","tipoId":"NIT","Id":"890300625","digitoVerificacion":"1","direccion":"CALLE 13 57 50","ciudad":"Medellín","telefono":"-3330000-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"COOPERATIVA NORTEÑA DE TRANSPORTE TLDA","tipoId":"NIT","Id":"890905680","digitoVerificacion":"2","direccion":"TRANSVERSAL 78 # 65-376","ciudad":"Bello","telefono":"604-4801580-","nombreContacto":"COOPERATIVA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Coosalud","tipoId":"NIT","Id":"900226715","digitoVerificacion":"","direccion":"Cl. 74 #73-93","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Coosalud Eps","tipoId":"NIT","Id":"800249241","digitoVerificacion":"","direccion":"","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"COPAPINTURAS SAS","tipoId":"NIT","Id":"901327640","digitoVerificacion":"7","direccion":"calle 53 # 47-11","ciudad":"Copacabana","telefono":"-3226979294-","nombreContacto":"Adriana Agudelo","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Croma Pinturas","tipoId":"Cédula de ciudadanía","Id":"1152185241","digitoVerificacion":"","direccion":"Cr 48 # 51-12","ciudad":"Bello","telefono":"-3135512908-","nombreContacto":"Tatiana Aristizabal Vargas","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Cruz Blanca Eps","tipoId":"NIT","Id":"830009783","digitoVerificacion":"0","direccion":"","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"CUBRIMIENTO GALVANICO","tipoId":"NIT","Id":"893652412","digitoVerificacion":"9","direccion":"CALLE 40#53-52","ciudad":"Medellín","telefono":"604-3113215574-","nombreContacto":"CUBRIMIENTO GALVANICO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"D1 S.A.S","tipoId":"NIT","Id":"900276962","digitoVerificacion":"1","direccion":"cra55#28-39","ciudad":"Bello","telefono":"604-0180001202-","nombreContacto":"D1 S.A.S","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DANY CAR","tipoId":"Cédula de ciudadanía","Id":"22147400","digitoVerificacion":"5","direccion":"CR 78 A # 77 37","ciudad":"Medellín","telefono":"-3137675701-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Darwin Yesid Mendoza","tipoId":"Cédula de ciudadanía","Id":"1035128734","digitoVerificacion":"","direccion":"ANORI - PARQUE PRINCIPAL","ciudad":"Anorí","telefono":"-3136022315-","nombreContacto":"Darwin Yesid Mendoza","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DAVINSON RUA","tipoId":"Cédula de ciudadanía","Id":"1007317843","digitoVerificacion":"0","direccion":"","ciudad":"Remedios","telefono":"604-3104178583-","nombreContacto":"DAVINSON RUA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Davivienda","tipoId":"NIT","Id":"860034313","digitoVerificacion":"","direccion":"Avenida Eldorado 68C-  61, piso  10.","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DE CEROS A ACABADOS SAS","tipoId":"NIT","Id":"901074621","digitoVerificacion":"1","direccion":"CL 28 30B-24","ciudad":"La Pintada","telefono":"-3144757208-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Deltaflex #1 Deltaflex #1","tipoId":"Cédula de ciudadanía","Id":"71225259","digitoVerificacion":"5","direccion":"CL 65 # 64-56","ciudad":"Bello","telefono":"-3128909470-","nombreContacto":"Albeiro Montoya Restrepo","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Deposito Cinco estrellas #2","tipoId":"Cédula de ciudadanía","Id":"1128388718","digitoVerificacion":"","direccion":"av 35 E # 42DC -113","ciudad":"Copacabana","telefono":"-3044748414-","nombreContacto":"Cesar Alexander Muñoz Fernandez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO DIFER","tipoId":"NIT","Id":"900805799","digitoVerificacion":"6","direccion":"CRA50#63A78","ciudad":"Bello","telefono":"604-3188067492-","nombreContacto":"IVAN OSSA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO EL DUCADO","tipoId":"Cédula de ciudadanía","Id":"98713648","digitoVerificacion":"9","direccion":"CL 66 # 58-41","ciudad":"Bello","telefono":"604-3146444156-","nombreContacto":"DEPOSITO EL DUCADO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO EL PAISA","tipoId":"Cédula de ciudadanía","Id":"43805639","digitoVerificacion":"8","direccion":"CALLE 19 CON CARRERA 19","ciudad":"San Roque","telefono":"604-3128171367-","nombreContacto":"DEPOSITO EL PAISA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO LA 40","tipoId":"Cédula de ciudadanía","Id":"70503618","digitoVerificacion":"","direccion":"CL 40 # 51-47","ciudad":"Itagui","telefono":"-3053143140-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Deposito LA AVENIDA","tipoId":"Cédula de ciudadanía","Id":"1020428507","digitoVerificacion":"4","direccion":"Diagonal 55 # 44-82","ciudad":"Bello","telefono":"-3218657719-","nombreContacto":"Nillerleidy Agudelo Gallego","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO LOS PAISAS","tipoId":"Cédula de ciudadanía","Id":"7896324","digitoVerificacion":"1","direccion":"","ciudad":"Medellín","telefono":"604-3116117520-","nombreContacto":"DEPOSITO LOS PAISAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO LOS POSADA","tipoId":"NIT","Id":"32150385","digitoVerificacion":"0","direccion":"CRA 50 #120sur-51","ciudad":"Caldas","telefono":"57-3154609952-","nombreContacto":"DEPOSITO LOS POSADA LOS POSADA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO LOS PULGARIN","tipoId":"Cédula de ciudadanía","Id":"742363213","digitoVerificacion":"1","direccion":"Calle 18#15=34","ciudad":"Cisneros","telefono":"604-3112094513-","nombreContacto":"DEPOSITO LOS PULGARIN","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Deposito MAO","tipoId":"Cédula de ciudadanía","Id":"1020430640","digitoVerificacion":"","direccion":"Cr 72 # 91 28","ciudad":"Medellín","telefono":"-3175252457-","nombreContacto":"Edgar Montoya","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO MI TACITA DE ORO","tipoId":"Cédula de ciudadanía","Id":"85469611","digitoVerificacion":"3","direccion":"CL 52 # 9 10","ciudad":"Medellín","telefono":"604-4449961-","nombreContacto":"Alonso Quintero","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Deposito Moravia","tipoId":"Cédula de ciudadanía","Id":"8245207","digitoVerificacion":"9","direccion":"Carrera 53a #82a84","ciudad":"Medellín","telefono":"-2637457-","nombreContacto":"Jose antonio Ramirez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO PROSPERO","tipoId":"Cédula de ciudadanía","Id":"782345223","digitoVerificacion":"4","direccion":"CR 68# 66-35","ciudad":"Itagui","telefono":"604-3006300025-","nombreContacto":"DEPOSITO PROSPERO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO Y FERRETERÍA ALSAN SAS","tipoId":"NIT","Id":"900816017","digitoVerificacion":"2","direccion":"CR 81 39SUR -39","ciudad":"Medellín","telefono":"--","nombreContacto":"ALBEIRO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Deposito y FERRETERÍA CJ","tipoId":"Cédula de ciudadanía","Id":"8203308","digitoVerificacion":"","direccion":"Cr 67b # 56b-126","ciudad":"Bello","telefono":"-3127235407-","nombreContacto":"Javier Antonio Gallego Jaramillo","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO Y FERRETERÍA DEL SUR","tipoId":"NIT","Id":"800245727","digitoVerificacion":"0","direccion":"CLL 63 #44-78","ciudad":"Itagui","telefono":"57-3218509636-","nombreContacto":"DEPOSITO Y FERRETERÍA DEL SUR DEL SUR","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO Y FERRETERÍA DITAIRES","tipoId":"Cédula de ciudadanía","Id":"71271886","digitoVerificacion":"9","direccion":"CL 36 61-16","ciudad":"Itagui","telefono":"-3043752297-","nombreContacto":"ROSIO HENAO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Deposito y FERRETERÍA Julian","tipoId":"Cédula de ciudadanía","Id":"71270077","digitoVerificacion":"2","direccion":"Cl 35 # 54-51","ciudad":"Bello","telefono":"604-2755591-","nombreContacto":"Milena Grisales","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO Y FERRETERÍA LA 31","tipoId":"NIT","Id":"963212332","digitoVerificacion":"4","direccion":"CALLE 31#30-140","ciudad":"Medellín","telefono":"604-3215470129-","nombreContacto":"0000","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO Y FERRETERÍA LA 32","tipoId":"NIT","Id":"7893242312","digitoVerificacion":"8","direccion":"CRA56#32-09","ciudad":"Bello","telefono":"604-3137988576-","nombreContacto":"DEPOSITO Y FERRETERÍA LA 32 Y FERRETERÍA LA 32","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO Y FERRETERÍA LA BODEGA","tipoId":"Cédula de ciudadanía","Id":"78931236","digitoVerificacion":"1","direccion":"CL 36 # 67-20","ciudad":"Bello","telefono":"604-3127609580-","nombreContacto":"DEPOSITO Y FERRETERÍA LA BODEGA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO Y FERRETERÍA LA CURVA","tipoId":"Cédula de ciudadanía","Id":"98456294","digitoVerificacion":"","direccion":"Calle 56 # 24 AA - 60","ciudad":"Medellín","telefono":"-3205645842-","nombreContacto":"Oliverio Montes Lopez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO Y FERRETERÍA LA ZONA DE LOS LOPEZ","tipoId":"Cédula de ciudadanía","Id":"98538264","digitoVerificacion":"4","direccion":"CRA50#117 SUR 58","ciudad":"Caldas","telefono":"-3128298805-","nombreContacto":"AUGUSTO LOPEZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DEPOSITO Y FERRETERÍA LOS MONOS","tipoId":"Cédula de ciudadanía","Id":"3415714","digitoVerificacion":"0","direccion":"CLL 47c#59c-65","ciudad":"Itagui","telefono":"-3024530458-","nombreContacto":"DEPOSITO Y FERRETERÍA LOS MONOS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Deposito y FERRETERÍA MJ","tipoId":"Cédula de ciudadanía","Id":"98587301","digitoVerificacion":"8","direccion":"Cr 66 # 59a-73","ciudad":"Bello","telefono":"-3127439569-","nombreContacto":"Martin Alonso Jimenez Serna","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Deposito y FERRETERÍA R&S","tipoId":"Cédula de ciudadanía","Id":"32324452","digitoVerificacion":"","direccion":"Cl 56b # 56BB-74","ciudad":"Bello","telefono":"-3003801606-","nombreContacto":"Rubierla del Carmen Lopez Arcila","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Depostio Cumbre La 58","tipoId":"Cédula de ciudadanía","Id":"49658151","digitoVerificacion":"7","direccion":"Cl 58 # 61-25","ciudad":"Bello","telefono":"604-4572185-","nombreContacto":"ANGELICA SANTOS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DIAN","tipoId":"NIT","Id":"800197268","digitoVerificacion":"","direccion":"Carrera 8 N 6C - 38 Edificio San Agustín","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Dibier Alexis Hernandez Gomez","tipoId":"Cédula de ciudadanía","Id":"1128434206","digitoVerificacion":"9","direccion":"cr 57 # 38 220","ciudad":"Medellín","telefono":"-3216174417-","nombreContacto":"Dibier Alexis Hernandez Gomez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Dibier Hernandez","tipoId":"Cédula de ciudadanía","Id":"1036643095","digitoVerificacion":"0","direccion":"","ciudad":"Bello","telefono":"--","nombreContacto":"Dibier Hernandez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DIBIER HERNANDEZ","tipoId":"Cédula de ciudadanía","Id":"103856978","digitoVerificacion":"5","direccion":"CRA57#28-23","ciudad":"Bello","telefono":"604-5872806-","nombreContacto":"DIBIER HERNANDEZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Diego Alejandro Salazar Gomez","tipoId":"Cédula de ciudadanía","Id":"1017214448","digitoVerificacion":"","direccion":"ANORI - PARQUE PRINCIPAL","ciudad":"Anorí","telefono":"-3108944118-","nombreContacto":"Diego Alejandro Salazar Gomez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DIEGO SUAREZ ALVAREZ","tipoId":"Cédula de ciudadanía","Id":"1035876120","digitoVerificacion":"3","direccion":"cra74#98-19","ciudad":"Bello","telefono":"604-3104099106-","nombreContacto":"DIEGO SUAREZ ALVAREZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Diego Vargas","tipoId":"Cédula de ciudadanía","Id":"1128418191","digitoVerificacion":"1","direccion":"Calle 19 74a15","ciudad":"Medellín","telefono":"-3014084974-","nombreContacto":"Diego Vargas","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DISTRACOM","tipoId":"NIT","Id":"811009788","digitoVerificacion":"8","direccion":"DIAGONAL50A#42B25","ciudad":"","telefono":"604-3104257588-","nombreContacto":"DISTRACOM","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DISTRIBUCIONES AGUIRRE SIERRA SAS","tipoId":"NIT","Id":"9006448677","digitoVerificacion":"1","direccion":"CRA64C#103GG75","ciudad":"Bello","telefono":"604-4720118-","nombreContacto":"DISTRIBUCIONES AGUIRRE SIERRA SAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DISTRIBUCIONES DE COMBUSTIBLES","tipoId":"NIT","Id":"9006428993","digitoVerificacion":"7","direccion":"cra 56#55-29","ciudad":"Medellín","telefono":"604-4088472-","nombreContacto":"DISTRIBUCIONES DE COMBUSTIBLES","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DISTRIBUCIONES TUTOR SAS","tipoId":"NIT","Id":"800137551","digitoVerificacion":"8","direccion":"CALLE49#57-5","ciudad":"Medellín","telefono":"604-5116987-","nombreContacto":"DISTRIBUCIONES TUTOR SAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DISTRIBUIDOR MAYORISTA SEGAR","tipoId":"NIT","Id":"890801763","digitoVerificacion":"8","direccion":"","ciudad":"Medellín","telefono":"604-3128504813-","nombreContacto":"YARSON","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DISTRIBUIDORA HG DISTRIBUIDORA HG","tipoId":"Cédula de ciudadanía","Id":"43646081","digitoVerificacion":"6","direccion":"","ciudad":"Medellín","telefono":"604-3195971821-","nombreContacto":"DISTRIBUIDORA HG DISTRIBUIDORA HG","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DISTRIBUIDORA RAMVAL SAS","tipoId":"NIT","Id":"901255137","digitoVerificacion":"3","direccion":"CL 52 # 49 27 OF 507","ciudad":"Medellín","telefono":"604-5124582-","nombreContacto":"ADRIAN RAMIREZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DISTRICENTRO FERRETERO","tipoId":"Cédula de ciudadanía","Id":"71376601","digitoVerificacion":"","direccion":"carrera 51 # 41 - 100","ciudad":"Medellín","telefono":"-3003502520-","nombreContacto":"Alexander Urrego","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DISTRIFINCA SAN ROQUE","tipoId":"NIT","Id":"98470088","digitoVerificacion":"1","direccion":"cl20#17-20","ciudad":"Bello","telefono":"604-3117197598-","nombreContacto":"JUAN MARTIN PELAEZ MOLINA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DOBLON S.A.S","tipoId":"NIT","Id":"900445984","digitoVerificacion":"7","direccion":"cra51#41-144","ciudad":"Medellín","telefono":"604-3227568-","nombreContacto":"DOBLON","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DOTACIONES MALVA","tipoId":"NIT","Id":"901601506","digitoVerificacion":"2","direccion":"LAS BRISAS","ciudad":"Medellín","telefono":"604-3137614818-","nombreContacto":"YENY","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Dusakawi","tipoId":"NIT","Id":"824001398","digitoVerificacion":"","direccion":"Cra. 6 #13-30","ciudad":"Valledupar","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"DYNA Y CIA S A","tipoId":"NIT","Id":"890901298","digitoVerificacion":"","direccion":"cra45D#32d-135","ciudad":"Medellín","telefono":"604-4449191-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ecoelectricos ecoelectricos","tipoId":"Cédula de ciudadanía","Id":"1063283532","digitoVerificacion":"0","direccion":"cr 21 9A 40","ciudad":"Barbosa","telefono":"604-3204150866-","nombreContacto":"alexander sierra valbuena","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Ecoopsos","tipoId":"NIT","Id":"901093846","digitoVerificacion":"","direccion":"Av. Boyacá No. 50-34","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Ecoopsos","tipoId":"NIT","Id":"832000760","digitoVerificacion":"8","direccion":"","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ECOPARK URBAN JUNIN","tipoId":"NIT","Id":"70567346","digitoVerificacion":"1","direccion":"calle52#49-55","ciudad":"Medellín","telefono":"604-3177137208-","nombreContacto":"ECOPARK URBAN JUNIN","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"EDS AUTOGAS","tipoId":"NIT","Id":"9004597375","digitoVerificacion":"1","direccion":"CRA64A#78-55","ciudad":"Medellín","telefono":"604-6071311-","nombreContacto":"EDS AUTOGAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"El español El español","tipoId":"Cédula de ciudadanía","Id":"1035229513","digitoVerificacion":"1","direccion":"Cl 16# 13 10","ciudad":"Barbosa","telefono":"-3115784447-","nombreContacto":"Jessica Andrea Garcia Agudelo","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ELECTRICOS CALDAS","tipoId":"Cédula de ciudadanía","Id":"783915663","digitoVerificacion":"1","direccion":"CRA 50#128 Sur 60","ciudad":"Caldas","telefono":"604-2721242-","nombreContacto":"ELECTRICOS CALDAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ELÉCTRICOS EL PARQUE ENVIGADO","tipoId":"NIT","Id":"811040427","digitoVerificacion":"4","direccion":"CLL 38SUR #41-53","ciudad":"Envigado","telefono":"-2706171-","nombreContacto":"ELÉCTRICOS EL PARQUE ENVIGADO El parque","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ELECTRICOS Y FERRETERÍA V&G","tipoId":"Cédula de ciudadanía","Id":"98486139","digitoVerificacion":"","direccion":"CR 54 # 45-174","ciudad":"Bello","telefono":"-3147094124-","nombreContacto":"Javier de jesus Yepes","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ELECTRO ALE","tipoId":"Cédula de ciudadanía","Id":"1017231998","digitoVerificacion":"9","direccion":"TAIWAN","ciudad":"Medellín","telefono":"604-3016517169-","nombreContacto":"ELECTRO ALE","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ELECTROBUJIAS S.A.S","tipoId":"NIT","Id":"900505601","digitoVerificacion":"1","direccion":"CL 41 CR 51-05","ciudad":"Medellín","telefono":"604-4637779-","nombreContacto":"SEBASTIAN ECHAVARRIA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ELECTROPLOMERIA Y FERRETERÍA SAS","tipoId":"NIT","Id":"901392930","digitoVerificacion":"","direccion":"cl 10 #43c-46","ciudad":"Medellín","telefono":"-3142864031-","nombreContacto":"Arnoldo","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Electryfenix Electryfenix","tipoId":"Cédula de ciudadanía","Id":"71363034","digitoVerificacion":"6","direccion":"Cr 48 # 51 50","ciudad":"Bello","telefono":"-3053120634-","nombreContacto":"Andres Gonzalez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Emdisalud","tipoId":"NIT","Id":"811004055","digitoVerificacion":"5","direccion":"Cra. 43 #70-106","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"EMPAQUES PLASTICOS S&S","tipoId":"NIT","Id":"43073983","digitoVerificacion":"4","direccion":"CRA56B#49-79","ciudad":"Medellín","telefono":"604-5140607-","nombreContacto":"EMPAQUES PLASTICOS S&S","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Empresas Públicas de Medellín Departamento Médico","tipoId":"NIT","Id":"890904996","digitoVerificacion":"1","direccion":"Carrera 58 42-125","ciudad":"Medellín","telefono":"--","nombreContacto":"EPM","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Emssanar","tipoId":"NIT","Id":"814000337","digitoVerificacion":"1","direccion":"","ciudad":"Pasto","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"EPS Familiar de Colombia S.A.S.","tipoId":"NIT","Id":"901543761","digitoVerificacion":"4","direccion":"","ciudad":"Sincelejo","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Eps Famisanar","tipoId":"NIT","Id":"830003564","digitoVerificacion":"7","direccion":"CARRERA 13 A # 77A-63","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"EPS Sura","tipoId":"NIT","Id":"800088702","digitoVerificacion":"","direccion":"Cra. 71b #71-96","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ERIKA DANIELA RODRIGUEZ VASQUEZ","tipoId":"Cédula de ciudadanía","Id":"1007243830","digitoVerificacion":"6","direccion":"calle 123A#51 B5 2","ciudad":"Medellín","telefono":"604-3103072474-","nombreContacto":"ERIKA DANIELA RODRIGUEZ VASQUEZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Erika Liliana Martinez Barrientos","tipoId":"Cédula de ciudadanía","Id":"1035127075","digitoVerificacion":"","direccion":"ANORI - PARQUE PRINCIPAL","ciudad":"Anorí","telefono":"-3147840956-","nombreContacto":"Erika Liliana Martinez Barrientos","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ESTACION DE SERVICIO -MADEROS","tipoId":"NIT","Id":"8407324","digitoVerificacion":"9","direccion":"CRA57#28-37","ciudad":"Bello","telefono":"604-4731248-","nombreContacto":"SERGIO ANTONIO RAMIREZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ESTO PA MOTOS SAS","tipoId":"NIT","Id":"901228359","digitoVerificacion":"7","direccion":"calle 38#51-20","ciudad":"Medellín","telefono":"604-3006452180-","nombreContacto":"ESTO PA MOTOS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"EXITO","tipoId":"NIT","Id":"890900608","digitoVerificacion":"9","direccion":"FABRICATO","ciudad":"Bello","telefono":"604--","nombreContacto":"EXITO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Faber Aguilar","tipoId":"Cédula de ciudadanía","Id":"11111111","digitoVerificacion":"6","direccion":"cl 25 # 58 c 84","ciudad":"Bello","telefono":"604-32038332-","nombreContacto":"Faber Aguilar","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Federacion nacional de cajas de compensacion familiar fedecajas","tipoId":"NIT","Id":"860078674","digitoVerificacion":"1","direccion":"Cra. 10a #6758","ciudad":"Bogotá","telefono":"-2328771-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERNANDO OROZCO LOPERA","tipoId":"Cédula de ciudadanía","Id":"70925473","digitoVerificacion":"5","direccion":"CALLE PRINCIPAL","ciudad":"Anorí","telefono":"604-3506894712-","nombreContacto":"FERNANDO OROZCO LOPERA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERNANDO OSPINA","tipoId":"Cédula de ciudadanía","Id":"43029502","digitoVerificacion":"9","direccion":"CRA51#41-42 LOCAL 117","ciudad":"Bello","telefono":"604-3113281642-","nombreContacto":"FERNANDO OSPINA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Ferr&todo Ferr&todo","tipoId":"Cédula de ciudadanía","Id":"71768628","digitoVerificacion":"1","direccion":"Av 33b # 42g-62","ciudad":"Bello","telefono":"604-4826189-","nombreContacto":"SANTIAGO CANO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRE BOLIVAR","tipoId":"Cédula de ciudadanía","Id":"71173581","digitoVerificacion":"8","direccion":"CRA 21#20-15","ciudad":"Cisneros","telefono":"604-3217998814-","nombreContacto":"FERRE BOLIVAR","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRE LUZ CDS","tipoId":"Cédula de ciudadanía","Id":"1058912855","digitoVerificacion":"6","direccion":"Cl central # 30 94","ciudad":"La Pintada","telefono":"-3114115259-","nombreContacto":"Cristian Davida Sanchez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRE MAS","tipoId":"NIT","Id":"98602051","digitoVerificacion":"6","direccion":"cra89#63-38","ciudad":"Bello","telefono":"604-4417034-","nombreContacto":"FERRE MAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERREBOX S.A.S","tipoId":"NIT","Id":"901480869","digitoVerificacion":"1","direccion":"","ciudad":"Medellín","telefono":"604-3052254069-","nombreContacto":"LEIDY DANIELA BARRERA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERREKECTRICOS LUCAS","tipoId":"NIT","Id":"51962077","digitoVerificacion":"1","direccion":"CRA54#46-09","ciudad":"Medellín","telefono":"604-5121342-","nombreContacto":"FERREKECTRICOS LUCAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ferrelectricos LA PRINCIPAL","tipoId":"Cédula de ciudadanía","Id":"43989062","digitoVerificacion":"","direccion":"Diagonal 59a#23A-24","ciudad":"Bello","telefono":"-3148979502-","nombreContacto":"Ricardo Giraldo","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Ferrelectricos Puerta","tipoId":"Cédula de ciudadanía","Id":"71212993","digitoVerificacion":"","direccion":"Cl 51 # 47-78","ciudad":"Bello","telefono":"-3197136980-","nombreContacto":"ANDRES FERNEY PUERTA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRELECTRICOS SAN MIGUEL CALDAS","tipoId":"NIT","Id":"1026143845","digitoVerificacion":"6","direccion":"CRA 50 #133sur-80","ciudad":"Caldas","telefono":"57-3024037245-","nombreContacto":"FERRELECTRICOS SAN MIGUEL CALDAS San Miguel caldas","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Ferretalex Ferretalex","tipoId":"Cédula de ciudadanía","Id":"43665481","digitoVerificacion":"","direccion":"Cr 58 # 27a-31","ciudad":"Bello","telefono":"-3045972655-","nombreContacto":"Liliana Maria Hincapie Durango","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA","tipoId":"NIT","Id":"78321423","digitoVerificacion":"3","direccion":"CALLE50#39-280","ciudad":"Copacabana","telefono":"604-3103773983-","nombreContacto":"FERRETERÍA PCV CENTRO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA  MAKROELECTRICOS","tipoId":"NIT","Id":"25357623","digitoVerificacion":"2","direccion":"CRA50#54-06","ciudad":"Bello","telefono":"604-4542127-","nombreContacto":"FERRETERÍA MAKROELECTRICOS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA 7 LUNAS","tipoId":"Cédula de ciudadanía","Id":"43575468","digitoVerificacion":"7","direccion":"CL 64 FF # 116 C 119","ciudad":"Medellín","telefono":"-3045853211-","nombreContacto":"Kelly Madrid","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA ALADINO","tipoId":"NIT","Id":"707848641","digitoVerificacion":"6","direccion":"CL 51# 54-31","ciudad":"Bello","telefono":"604-3164282937-","nombreContacto":"WILSON RESTREPO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA Bellavista","tipoId":"Cédula de ciudadanía","Id":"8401634","digitoVerificacion":"","direccion":"Cl 65 # 63 b 02","ciudad":"Bello","telefono":"-3006313292-","nombreContacto":"NATALIA URIBE","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA Canito","tipoId":"Cédula de ciudadanía","Id":"8398590","digitoVerificacion":"1","direccion":"Cl 59 # 47-63","ciudad":"Bello","telefono":"-3008053184-","nombreContacto":"Oscar Cano","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA CISNEROS","tipoId":"Cédula de ciudadanía","Id":"70058924","digitoVerificacion":"5","direccion":"cra bolivar 19-06","ciudad":"Cisneros","telefono":"604-48632654-","nombreContacto":"CRISTOBAL ANTONIO ECHEVERRY  RAMIREZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA COLVIMA","tipoId":"Cédula de ciudadanía","Id":"245863367","digitoVerificacion":"1","direccion":"CRA20#18-09","ciudad":"Bello","telefono":"604-563473-","nombreContacto":"FERRETERÍA COLVIMA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA EL COSTEÑO","tipoId":"Cédula de ciudadanía","Id":"70631094","digitoVerificacion":"4","direccion":"CR 42B 35-01","ciudad":"Copacabana","telefono":"-3127468868-","nombreContacto":"Mario de jesus Correa Rivera","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA El Desvare","tipoId":"Cédula de ciudadanía","Id":"21429157","digitoVerificacion":"7","direccion":"CL 47 # 58 E 04","ciudad":"Bello","telefono":"-3108289333-","nombreContacto":"JOHAN","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA El Desvare #64","tipoId":"Cédula de ciudadanía","Id":"98486380","digitoVerificacion":"","direccion":"calle 45C # 20C - 21","ciudad":"Medellín","telefono":"-3146481895-","nombreContacto":"Homero Bedoya","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA EL PARQUE ERNESTO","tipoId":"Cédula de ciudadanía","Id":"72594662","digitoVerificacion":"6","direccion":"CALLE 56#24AA-60","ciudad":"Medellín","telefono":"604-3206086173-","nombreContacto":"ERNESTO ARANGO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA EL RECREO","tipoId":"Cédula de ciudadanía","Id":"43252119","digitoVerificacion":"","direccion":"Cr 52 A # 41 73","ciudad":"Copacabana","telefono":"-3147003303-","nombreContacto":"Dora Patricia Bedoya Carmona","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA EL RUBY","tipoId":"Cédula de ciudadanía","Id":"71649046","digitoVerificacion":"3","direccion":"CALLE 30#111-58","ciudad":"Medellín","telefono":"604-3217412729-","nombreContacto":"LUIS GUSTAVO OCAMPO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA EL TIO","tipoId":"Cédula de ciudadanía","Id":"98765565","digitoVerificacion":"","direccion":"calle 56B # 16-11","ciudad":"Medellín","telefono":"-3218734377-","nombreContacto":"Robin Quintero","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA Electricos Las 3MMM","tipoId":"Cédula de ciudadanía","Id":"43527190","digitoVerificacion":"","direccion":"cl 56b # 66bb-38","ciudad":"Bello","telefono":"-3126478727-","nombreContacto":"Maria Eugenia Quiroz Agudelo","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA ELECTRICOS LOREN SAS","tipoId":"NIT","Id":"901253190","digitoVerificacion":"5","direccion":"Cr 45 # 71 a 37","ciudad":"Medellín","telefono":"-3116024013-","nombreContacto":"Alemao Guarin","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA EMALU","tipoId":"Cédula de ciudadanía","Id":"89632413","digitoVerificacion":"4","direccion":"Calle 49a #5=67","ciudad":"Medellín","telefono":"604-3122706002-","nombreContacto":"FERRETERÍA EMALU","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA FERREGAL","tipoId":"Cédula de ciudadanía","Id":"75147258","digitoVerificacion":"","direccion":"BARRIO CENTRO # 30 29","ciudad":"La Pintada","telefono":"-3104225531-","nombreContacto":"OSCAR JAVIER MONTOYA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA FERRETOÑO","tipoId":"Cédula de ciudadanía","Id":"783642313","digitoVerificacion":"6","direccion":"Carrera 21#20=32","ciudad":"Caracolí","telefono":"604-3217623259-","nombreContacto":"FERRETERÍA FERRETOÑO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA FERROJO","tipoId":"Cédula de ciudadanía","Id":"125830142","digitoVerificacion":"2","direccion":"Carrera 69A #27-29","ciudad":"Bello","telefono":"-3128372777-","nombreContacto":"FERRETERÍA FERROJO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA FERROVALVULAS SAS","tipoId":"NIT","Id":"890928960","digitoVerificacion":"9","direccion":"CRA50#42-16","ciudad":"Medellín","telefono":"604-4481200-","nombreContacto":"FERRETERÍA FERROVALVULAS SAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA G&G","tipoId":"Cédula de ciudadanía","Id":"43815321","digitoVerificacion":"","direccion":"cl 54 # 50-56","ciudad":"Bello","telefono":"-3104572814-","nombreContacto":"Silvia Astrid Giraldo Ardila","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA GJ","tipoId":"Cédula de ciudadanía","Id":"17326662","digitoVerificacion":"8","direccion":"","ciudad":"Bello","telefono":"604--","nombreContacto":"JAIME GOMEZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA GOMEZ","tipoId":"NIT","Id":"783523241","digitoVerificacion":"4","direccion":"CRA58DD#25B-23","ciudad":"Bello","telefono":"604-3015130954-","nombreContacto":"FERRETERÍA GOMEZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA GOMEZA","tipoId":"Cédula de ciudadanía","Id":"1152192787","digitoVerificacion":"3","direccion":"CL 49 # 55 A 42 BODEGA CANDELARIA 501","ciudad":"Medellín","telefono":"604-3147346686-","nombreContacto":"DIEGO GOMEZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA GRAN PALACIO","tipoId":"Cédula de ciudadanía","Id":"70509525","digitoVerificacion":"6","direccion":"CALLE 10#2 ESTE 33 SN ANTONIO PRADO","ciudad":"Medellín","telefono":"-3768189-","nombreContacto":"SERGIO PALACIO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA HE","tipoId":"Cédula de ciudadanía","Id":"70385986","digitoVerificacion":"","direccion":"cra 42b #108-20","ciudad":"Medellín","telefono":"-3217848257-","nombreContacto":"Henry Soto","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA JPD","tipoId":"Cédula de ciudadanía","Id":"32140959","digitoVerificacion":"4","direccion":"CL 31 43C-12","ciudad":"Bello","telefono":"-3207258766-","nombreContacto":"Gladys Erleny Ceballos Galeano","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA JUANIS","tipoId":"Cédula de ciudadanía","Id":"1214726189","digitoVerificacion":"7","direccion":"carrera 51# 41-144 local 116","ciudad":"Medellín","telefono":"604--","nombreContacto":"FERRETERÍA JUANIS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA JUNTOS","tipoId":"NIT","Id":"070707","digitoVerificacion":"0","direccion":"CRA 51 #55-64","ciudad":"Itagui","telefono":"57-3137042951-","nombreContacto":"FERRETERÍA JUNTOS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA JYB","tipoId":"Cédula de ciudadanía","Id":"71622487","digitoVerificacion":"","direccion":"calle 52 # 46 - 47","ciudad":"Copacabana","telefono":"-3174987284-","nombreContacto":"Jorge calle","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA LA 28","tipoId":"Cédula de ciudadanía","Id":"872314256","digitoVerificacion":"0","direccion":"CRA 28 #59BB-19","ciudad":"Medellín","telefono":"604-3192956577-","nombreContacto":"FERRETERÍA LA 28","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA LA 70","tipoId":"Cédula de ciudadanía","Id":"43847739","digitoVerificacion":"6","direccion":"CR 70 # 34-35","ciudad":"Itagui","telefono":"604-3044770202-","nombreContacto":"BLANCA DORIS MARIN","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA LA BUENA VIBRA FERRETERÍA LA BUENA VIBRA","tipoId":"","Id":"98486239","digitoVerificacion":"0","direccion":"CALLE 51 #46-53","ciudad":"Bello","telefono":"604-3127817808-","nombreContacto":"FERRETERÍA LA BUENA VIBRA FERRETERÍA LA BUENA VIBRA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA LA CONSTANCIA","tipoId":"Cédula de ciudadanía","Id":"71371481","digitoVerificacion":"9","direccion":"CR 50 # 138B SUR-30","ciudad":"Caldas","telefono":"-3147066058-","nombreContacto":"antonio aguirre","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA LA FERRERIA","tipoId":"NIT","Id":"42693501","digitoVerificacion":"4","direccion":"calle 10 # 10 - 114","ciudad":"Girardota","telefono":"-3128243928-","nombreContacto":"Dario","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA LA MANGUITA","tipoId":"Cédula de ciudadanía","Id":"71660255","digitoVerificacion":"","direccion":"CR 824B #63-30","ciudad":"Medellín","telefono":"-3136686118-","nombreContacto":"carlos alvarez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA La Nueva","tipoId":"Cédula de ciudadanía","Id":"43799445","digitoVerificacion":"","direccion":"Cr 69 # 27-05","ciudad":"Bello","telefono":"-3116350641-","nombreContacto":"Laura Jaraba Gil","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA LA RAMADA","tipoId":"","Id":"896321472","digitoVerificacion":"0","direccion":"CR 75 # 50E SUR -13","ciudad":"Itagui","telefono":"604-3136591366-","nombreContacto":"FERRETERÍA LA RAMADA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA LA TERMINAL","tipoId":"NIT","Id":"32207431","digitoVerificacion":"8","direccion":"calle 56EE # 17B - 09 ENCISO","ciudad":"Medellín","telefono":"604-3229141383-@604-2223311-","nombreContacto":"WILLIAM HIGUITA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA LAS 3A","tipoId":"NIT","Id":"6361428","digitoVerificacion":"9","direccion":"CRA 50a #40-79","ciudad":"Itagui","telefono":"57-3012429307-","nombreContacto":"FERRETERÍA LAS 3A FERRETERÍA LAS 3A","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA LOS AMIGOS","tipoId":"Cédula de ciudadanía","Id":"71225259","digitoVerificacion":"5","direccion":"CL 70 64-33","ciudad":"","telefono":"604-3136184791-","nombreContacto":"Albeiro de jesus montoya restrepo","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA Los angeles","tipoId":"Cédula de ciudadanía","Id":"1037650650","digitoVerificacion":"1","direccion":"calle 57 # 39A - 13","ciudad":"Medellín","telefono":"-3046206556-","nombreContacto":"Consuelo","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA LOS ARANGO","tipoId":"Cédula de ciudadanía","Id":"93256231","digitoVerificacion":"2","direccion":"CALLE 56#21-01","ciudad":"Medellín","telefono":"604-3113273848-","nombreContacto":"FERRETERÍA LOS ARANGO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA LOS GONZALEZ","tipoId":"Cédula de ciudadanía","Id":"1037653476","digitoVerificacion":"1","direccion":"Calle 4sur #30-128","ciudad":"","telefono":"604-3202733372-","nombreContacto":"FERRETERÍA LOS LOS GONZALEZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA LOS PARQUEADEROS","tipoId":"Cédula de ciudadanía","Id":"783242013","digitoVerificacion":"5","direccion":"CRA55#45A40","ciudad":"Medellín","telefono":"604-4075841-","nombreContacto":"FERRETERÍA LOS PARQUEADEROS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA Luz","tipoId":"Cédula de ciudadanía","Id":"43429827","digitoVerificacion":"3","direccion":"Cl 33 # 55-30","ciudad":"Bello","telefono":"-3136518998-","nombreContacto":"HERNEIDER CARDONA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA MADEPUNTO","tipoId":"Cédula de ciudadanía","Id":"43986586","digitoVerificacion":"1","direccion":"CL 48 # 57 02","ciudad":"Medellín","telefono":"604-5112481-","nombreContacto":"LUDIS ZULEMA POSADA PEREZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA MENOR ROSALEDA","tipoId":"Cédula de ciudadanía","Id":"98536665","digitoVerificacion":"","direccion":"CR 55 # 48CSUR -73","ciudad":"Itagui","telefono":"-3206987932-","nombreContacto":"WILSON HENAO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA MERKACHEPE","tipoId":"","Id":"78953423","digitoVerificacion":"0","direccion":"CR68 # 151-500","ciudad":"Itagui","telefono":"604-3113656145-","nombreContacto":"FERRETERÍA MERKACHEPE","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA PIOLO","tipoId":"Cédula de ciudadanía","Id":"70002476","digitoVerificacion":"6","direccion":"CRA 56#56_100","ciudad":"Itagui","telefono":"-3113989812-","nombreContacto":"FERRETERÍA PIOLO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA PRADOS DE MARIA","tipoId":"Cédula de ciudadanía","Id":"71876598","digitoVerificacion":"","direccion":"CLL56 SUR 68A-04","ciudad":"Itagui","telefono":"-3122200206-","nombreContacto":"LEANDRO ESTRADA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA PV CENTRO","tipoId":"Cédula de ciudadanía","Id":"7893245123","digitoVerificacion":"6","direccion":"CALLE50#39-280","ciudad":"Copacabana","telefono":"604-3103773983-","nombreContacto":"FERRETERÍA PV CENTRO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA RDJ","tipoId":"Cédula de ciudadanía","Id":"70692271","digitoVerificacion":"","direccion":"Cr 73 # 25a-30","ciudad":"Bello","telefono":"-3113321521-","nombreContacto":"Ruben Dario Garcia Gomez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA RIO FRIO SAS","tipoId":"NIT","Id":"901096570","digitoVerificacion":"7","direccion":"Cl 43 # 48 29","ciudad":"Medellín","telefono":"-3194500075-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA SAENA","tipoId":"Cédula de ciudadanía","Id":"70909366","digitoVerificacion":"8","direccion":"calle48#53-39","ciudad":"Medellín","telefono":"604-5126999-","nombreContacto":"Diego Alejandro Hurtado Gomez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA San Miguel","tipoId":"Cédula de ciudadanía","Id":"1035860923","digitoVerificacion":"0","direccion":"carrera 16 # 5A - 20","ciudad":"Girardota","telefono":"-3105946028-","nombreContacto":"Monica Marcela Villada Avendaño","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA Santi","tipoId":"Cédula de ciudadanía","Id":"22215248","digitoVerificacion":"","direccion":"Cl 51 # 54-25","ciudad":"Bello","telefono":"-3122238674-","nombreContacto":"ventas@sincrogs.com","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA SERRAMONTE SAS","tipoId":"NIT","Id":"901459445","digitoVerificacion":"3","direccion":"CL 40 AA 59 C 19","ciudad":"Bello","telefono":"604-4170341-","nombreContacto":"ALEJANDRA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA SU LLAVE","tipoId":"Cédula de ciudadanía","Id":"1094883074","digitoVerificacion":"","direccion":"CR 48 # 47 13","ciudad":"Amagá","telefono":"-3113700437-","nombreContacto":"DIANA ANGARITA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA TECNICA","tipoId":"NIT","Id":"890900490","digitoVerificacion":"7","direccion":"CRA 51 #44-98","ciudad":"Medellín","telefono":"604-5123915-","nombreContacto":"JUAN","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA TOTOY","tipoId":"Cédula de ciudadanía","Id":"71490807","digitoVerificacion":"6","direccion":"CR 55 # 47-31","ciudad":"Itagui","telefono":"-3117823339-","nombreContacto":"FREDDY GOMEEZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA V&H","tipoId":"Cédula de ciudadanía","Id":"1076350707","digitoVerificacion":"7","direccion":"","ciudad":"Medellín","telefono":"604--","nombreContacto":"LEIDY MOSQUERA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA ven Arias quintero","tipoId":"Cédula de ciudadanía","Id":"3578706","digitoVerificacion":"0","direccion":"Carrera 80 95 a 104","ciudad":"Medellín","telefono":"-3057631513-","nombreContacto":"Benedito Arias quintero","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA VM","tipoId":"Cédula de ciudadanía","Id":"98715777","digitoVerificacion":"","direccion":"cl 65 # 65-07","ciudad":"Bello","telefono":"-3206727870-","nombreContacto":"Camilo Gonzalez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA Y CERRAJERIA LA BENDICION","tipoId":"Cédula de ciudadanía","Id":"98622453","digitoVerificacion":"","direccion":"CR 50 # 122SUR-130","ciudad":"Itagui","telefono":"-3122940765-","nombreContacto":"LUIS Muñoz","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA Y DEPOSITO ACEVEDO","tipoId":"NIT","Id":"901244073","digitoVerificacion":"3","direccion":"CRA 52#109B-02","ciudad":"","telefono":"604-3588215-","nombreContacto":"FERRETERÍA Y DEPOSITO ACEVEDO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA Y DEPOSITO ALCALA","tipoId":"NIT","Id":"89632147","digitoVerificacion":"1","direccion":"CALLE 43SUR 59-06 SN ANTONIO PRADO","ciudad":"Medellín","telefono":"604-3015321226-","nombreContacto":"MAURICIO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA Y DEPOSITO CINCO ESQUINAS SAS","tipoId":"NIT","Id":"900605767","digitoVerificacion":"2","direccion":"Calle 20f # 76-25","ciudad":"Bello","telefono":"604-4614939-","nombreContacto":"Mateo Franco","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA Y DEPOSITO LA YE","tipoId":"Cédula de ciudadanía","Id":"115221959","digitoVerificacion":"3","direccion":"calle 49a #6a-42","ciudad":"Medellín","telefono":"604-3013478037-","nombreContacto":"FERRETERÍA Y DEPOSITO LA YE","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA Y ELECTRICOS BJM# 2","tipoId":"Cédula de ciudadanía","Id":"98524318","digitoVerificacion":"","direccion":"CR 68 # 55 75","ciudad":"Itagui","telefono":"-3015672946-","nombreContacto":"BERNANDO DUARTE","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA Y MATERIALES PARA LA CONSTRUCCION AG","tipoId":"NIT","Id":"98641527","digitoVerificacion":"6","direccion":"CRA 54#31-101","ciudad":"Bello","telefono":"604-3206174594-","nombreContacto":"ALBEIRO DE JESUS GONZALEZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA Y PINTURA LOS AMIGOS","tipoId":"Cédula de ciudadanía","Id":"901485782","digitoVerificacion":"0","direccion":"calle70#64-33","ciudad":"Bello","telefono":"604--","nombreContacto":"FERRETERÍA Y PINTURA LOS AMIGOS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA Y SERRAJERIA LA BENDICION DE LUIS","tipoId":"Cédula de ciudadanía","Id":"782342143","digitoVerificacion":"1","direccion":"CR 50 # 122SUR-130","ciudad":"Caldas","telefono":"604-3122940765-","nombreContacto":"FERRETERÍA Y SERRAJERIA LA BENDICION DE LUIS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA YIRE","tipoId":"NIT","Id":"901271647","digitoVerificacion":"5","direccion":"CALLE 27B #55-35","ciudad":"Bello","telefono":"604-3003905578-","nombreContacto":"FERRETERÍA YIRE","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRETERÍA Z-Z","tipoId":"Cédula de ciudadanía","Id":"8932423","digitoVerificacion":"0","direccion":"CRA89#31B23","ciudad":"Medellín","telefono":"604-5578130-","nombreContacto":"FERRETERÍA Z-Z","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERRIGAS","tipoId":"NIT","Id":"789314723","digitoVerificacion":"8","direccion":"cr 48 # 51-06","ciudad":"Bello","telefono":"604-3123964741-","nombreContacto":"FERRIGAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERROCABLE LA 108","tipoId":"Cédula de ciudadanía","Id":"1001866324","digitoVerificacion":"2","direccion":"","ciudad":"Medellín","telefono":"604--","nombreContacto":"MARIANO LOBO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERROEBANISTA ISA","tipoId":"Cédula de ciudadanía","Id":"35144997","digitoVerificacion":"","direccion":"CR 30 # 31 48","ciudad":"Don Matías","telefono":"-3174473257-","nombreContacto":"Obed eli Rivero","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERROELECTRICOS JAC","tipoId":"NIT","Id":"71370772","digitoVerificacion":"2","direccion":"CRA52#98-35","ciudad":"Bello","telefono":"604-5977306-","nombreContacto":"FERROELECTRICOS JAC","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERROELECTRICOS LA 50","tipoId":"NIT","Id":"01","digitoVerificacion":"8","direccion":"AV50A#54-23","ciudad":"Bello","telefono":"604-3145555921-","nombreContacto":"ESTIVEN","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERROELECTRICOS LA 63","tipoId":"NIT","Id":"000000","digitoVerificacion":"0","direccion":"CRA63B#70-34","ciudad":"Bello","telefono":"604-3145555921-","nombreContacto":"ESTIVEN","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERROELECTRICOS LA PRINCIPAL","tipoId":"","Id":"878245674","digitoVerificacion":"0","direccion":"Diagonal 59A #23A-34","ciudad":"Bello","telefono":"604-3148979502-","nombreContacto":"FERROELECTRICOS LA PRINCIPAL","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERROELECTRICOS ZONA LIBRE #2","tipoId":"Cédula de ciudadanía","Id":"70825581","digitoVerificacion":"3","direccion":"CALLE 48N55-57","ciudad":"Medellín","telefono":"604-5017147-","nombreContacto":"FERROELECTRICOS ZONA LIBRE #2","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERROMATERIALES FENIX","tipoId":"NIT","Id":"901274411","digitoVerificacion":"8","direccion":"CRA 58 #78-44","ciudad":"Itagui","telefono":"57-3016235314-","nombreContacto":"FERROMATERIALES FENIX FENIX","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERROMATERIALES LAS MARGARITAS","tipoId":"Cédula de ciudadanía","Id":"71791772","digitoVerificacion":"","direccion":"CR 53 B # 34 A 25","ciudad":"Itagui","telefono":"-3008832890-","nombreContacto":"GIOVANI RAMIREZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERROMATERIALES LUGO","tipoId":"NIT","Id":"901074001","digitoVerificacion":"3","direccion":"CR 59B # 55-96","ciudad":"Itagui","telefono":"604-3206664620-","nombreContacto":"WILMER MEDINA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ferronline ferronline","tipoId":"Cédula de ciudadanía","Id":"1055831981","digitoVerificacion":"7","direccion":"carrera 50#137aSUR=21 Caldas","ciudad":"Medellín","telefono":"-3002448585-","nombreContacto":"Pablo Martinez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERROPINTURA JD","tipoId":"NIT","Id":"98700575","digitoVerificacion":"0","direccion":"CRA 42#35-10","ciudad":"Bello","telefono":"604-3016107600-","nombreContacto":"FERROPINTURA JD","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Ferropintura MAS POR MENOS","tipoId":"Cédula de ciudadanía","Id":"70324935","digitoVerificacion":"7","direccion":"Cr 17  7 232","ciudad":"Girardota","telefono":"-3117567212-","nombreContacto":"Albeiro Alonso Zapata Uribe","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FERROPINTURASANDRES LA 46 SAS","tipoId":"NIT","Id":"901570268","digitoVerificacion":"1","direccion":"CRA 56#45-77","ciudad":"Medellín","telefono":"604-5898506-","nombreContacto":"FERROPINTURASANDRES LA 46 SAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Fondo de pasivo social de ferrocarriles nacionales de colombia","tipoId":"NIT","Id":"800112806","digitoVerificacion":"","direccion":"Cl. 13 #18-24","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Fondo Nacional de Ahorro","tipoId":"NIT","Id":"899999284","digitoVerificacion":"","direccion":"Calle 18 N. 7-49","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Fonprecon","tipoId":"NIT","Id":"899999734","digitoVerificacion":"","direccion":"Carrera 10 No. 24 - 55","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Fosyga","tipoId":"NIT","Id":"901037916","digitoVerificacion":"","direccion":"Cl. 32 #1318","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Fosyga Régimen de Excepción","tipoId":"NIT","Id":"901037916","digitoVerificacion":"","direccion":"Cl. 32 #1318","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Fosyga Residente Exterior o Régimen Subsidiado","tipoId":"NIT","Id":"901037916","digitoVerificacion":"","direccion":"Cl. 32 #1318","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FRANCISCO JAVIER GIL CANO","tipoId":"Cédula de ciudadanía","Id":"71421321","digitoVerificacion":"4","direccion":"CL 56 #53A04","ciudad":"Itagui","telefono":"604-3022971246-000","nombreContacto":"FRANCISCO JAVIER GIL CANO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FRANCISCO MURILLO S.A.S","tipoId":"NIT","Id":"890941794","digitoVerificacion":"6","direccion":"CRR 50C#10S-161","ciudad":"Medellín","telefono":"604-6042292-","nombreContacto":"FRANCISCO MURILLO S.A.S","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Fredy Graciano lopera","tipoId":"Cédula de ciudadanía","Id":"98763338","digitoVerificacion":"4","direccion":"Calle 52b#62 84","ciudad":"Bello","telefono":"-3024252564-","nombreContacto":"Fredy Graciano lopera","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"FUNDICIONES MEDELLIN","tipoId":"NIT","Id":"9011500753","digitoVerificacion":"1","direccion":"CARRERA 52 109 B 19","ciudad":"","telefono":"604-3015149488-","nombreContacto":"FUNDICIONES MEDELLIN","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"GALLO MARTINEZ SAS","tipoId":"NIT","Id":"9009138324","digitoVerificacion":"6","direccion":"cra64c#89-112","ciudad":"Bello","telefono":"604-3234631760-","nombreContacto":"EDS MARIA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"GILDARDO CASTAÑEDA","tipoId":"Cédula de ciudadanía","Id":"989365242","digitoVerificacion":"0","direccion":"CRA68A111-03","ciudad":"Medellín","telefono":"604-6068880-","nombreContacto":"GILDARDO CASTAÑEDA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"gladis jaramillo","tipoId":"Cédula de ciudadanía","Id":"42792492","digitoVerificacion":"0","direccion":"","ciudad":"","telefono":"604-3104713343-","nombreContacto":"gladis jaramillo","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Granfondo","tipoId":"NIT","Id":"800097913","digitoVerificacion":"8","direccion":"Calle 59 a bis n 5","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"GRUPO AUTOGAS SAS","tipoId":"NIT","Id":"900459737","digitoVerificacion":"5","direccion":"CRA50#25B15","ciudad":"Bello","telefono":"604-6071311-3671","nombreContacto":"AUTOGAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"GRUPO SEELECTO SAS","tipoId":"NIT","Id":"900607498","digitoVerificacion":"5","direccion":"carrera 36 # 83 - 21","ciudad":"Medellín","telefono":"-3133858204-","nombreContacto":"Patricia","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"GRUPO SINCRO S.A.S","tipoId":"NIT","Id":"901132065","digitoVerificacion":"","direccion":"CABAÑAS- BELLO","ciudad":"Bello","telefono":"-3144579060-","nombreContacto":"William Dario Hernandez Gomez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"GRUPO VIC SAS","tipoId":"NIT","Id":"901119399","digitoVerificacion":"4","direccion":"cra48#52-09","ciudad":"Copacabana","telefono":"604-5577110-","nombreContacto":"GRUPO VIC SAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Hector mario Quirama henao","tipoId":"Cédula de ciudadanía","Id":"71599359","digitoVerificacion":"8","direccion":"Calle 96#76aa 57","ciudad":"Medellín","telefono":"-3207451920-","nombreContacto":"Hector mario Quirama henao","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Hernan Dario Arias Tamayo","tipoId":"Cédula de ciudadanía","Id":"15343312","digitoVerificacion":"","direccion":"ANORI - PARQUE PRINCIPAL","ciudad":"Anorí","telefono":"-3126300309-","nombreContacto":"Hernan Dario Arias Tamayo","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"HERRAJES Y SOLUCIONES","tipoId":"NIT","Id":"1193533408","digitoVerificacion":"0","direccion":"","ciudad":"Medellín","telefono":"604--","nombreContacto":"KEVIN ZAPATA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"HERRAMIENTAS Y","tipoId":"NIT","Id":"901254297","digitoVerificacion":"9","direccion":"CR 48#52-31","ciudad":"Bello","telefono":"604-3005314219-","nombreContacto":"HERRAMIENTAS Y SERVICIOS A.A S.A.S","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"HERRAMIENTAS Y MASÍAS","tipoId":"NIT","Id":"900938307","digitoVerificacion":"","direccion":"cra72a#71a-31","ciudad":"Medellín","telefono":"604-5479126-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"HERRERAS CERRAJERIA Y ACESORIOS HERRERAS CERRAJERIA Y ACESORIOS","tipoId":"Cédula de ciudadanía","Id":"43685196","digitoVerificacion":"","direccion":"CR 50 DG 53 # 125 SUR 40","ciudad":"Itagui","telefono":"-3207649389-","nombreContacto":"CRISTINA COLORADO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"HF FERROELECTRICOS SAS","tipoId":"NIT","Id":"901481602","digitoVerificacion":"5","direccion":"CL 50 # 52 04","ciudad":"Itagui","telefono":"-3103849546-","nombreContacto":"FELIPE ERAZO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ICBF","tipoId":"NIT","Id":"899999239","digitoVerificacion":"","direccion":"Avenida Cra. 68 No.64C-75","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ICBF - Instituto Colombiano de Bienestar Familiar","tipoId":"NIT","Id":"899999001","digitoVerificacion":"","direccion":"Ministerio de Educación: Calle 43 No. 57 - 14.","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ICOMALLAS","tipoId":"NIT","Id":"805007404","digitoVerificacion":"4","direccion":"Cra. 1 #17-50 COMUNA 3","ciudad":"Medellín","telefono":"604-4856884-","nombreContacto":"ICOMALLAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ICTUS COMMUNITY S A S","tipoId":"NIT","Id":"901144636","digitoVerificacion":"0","direccion":"calle 46#53-26 local 204","ciudad":"Bello","telefono":"604-3003210542-","nombreContacto":"ICTUS COMMUNITY S A S","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"IMPORTACIONES GARPA CONTINENTAL S.A.S","tipoId":"NIT","Id":"901378826","digitoVerificacion":"8","direccion":"cra43#36-15","ciudad":"Medellín","telefono":"-3175114671-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"IMPORTACIONES UNIFER SAS","tipoId":"NIT","Id":"901140168","digitoVerificacion":"7","direccion":"CRA71#3-588 LOCAL 2","ciudad":"Medellín","telefono":"604-3175114671-","nombreContacto":"MPORTACIONES UNIFER SAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"IMPORTADORA AZ","tipoId":"NIT","Id":"754234123","digitoVerificacion":"8","direccion":"CRA53#85-74","ciudad":"Medellín","telefono":"604-5723423-","nombreContacto":"IMPORTADORA AZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"IMPORTADORA TAURUS S.A.S","tipoId":"NIT","Id":"901288440","digitoVerificacion":"2","direccion":"CALLE 6 A # 25A-05","ciudad":"Bogotá","telefono":"604-034201404-","nombreContacto":"ANDRES PEREZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"INDUSTRIAS VANGOGH S.A.S.","tipoId":"NIT","Id":"900749013","digitoVerificacion":"","direccion":"calle47#72-98","ciudad":"Medellín","telefono":"604-4446879-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"INGEASESORIAS S.A.S","tipoId":"NIT","Id":"900590311","digitoVerificacion":"0","direccion":"CRA 71A25A41","ciudad":"Medellín","telefono":"604-3175126321-","nombreContacto":"INGEASESORIAS S.A.S","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"INMOBILIARIA SU PROPIEDAD","tipoId":"NIT","Id":"901230303","digitoVerificacion":"1","direccion":"Calle 10B # 36-07 OFICINA 202","ciudad":"Medellín","telefono":"604-3156733000-","nombreContacto":"INMOBILIARIA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Instituto de Seguros Sociales","tipoId":"NIT","Id":"860027404","digitoVerificacion":"","direccion":"","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"INSUMINGLO","tipoId":"NIT","Id":"900864675","digitoVerificacion":"3","direccion":"cl 115 #75-34 interior 101","ciudad":"Medellín","telefono":"604-5868647-","nombreContacto":"JORGE CASTRO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"INTER FERRETERÍA","tipoId":"Cédula de ciudadanía","Id":"15488165","digitoVerificacion":"6","direccion":"CR 50 # 42 95","ciudad":"Medellín","telefono":"604-2611288-","nombreContacto":"Robinson Dario Moreno Larrea","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"INTER RAPIDISIMO","tipoId":"NIT","Id":"800251569","digitoVerificacion":"7","direccion":"CABAÑAS","ciudad":"Bello","telefono":"604--","nombreContacto":"MARIA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"INTERACTUAR","tipoId":"NIT","Id":"890984843","digitoVerificacion":"3","direccion":"Cra. 45 # 26- 175","ciudad":"Bello","telefono":"604-4508800-","nombreContacto":"LA GABRIELA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"INVERSIONES  JOMARA S.A.S","tipoId":"NIT","Id":"900477710","digitoVerificacion":"3","direccion":"cra51#25-23 local 101","ciudad":"Bello","telefono":"604-6052616-","nombreContacto":"INVERSIONES  JOMARA S.A.S","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"INVERSIONES FERRETERÍAS J&M S.A.S 000","tipoId":"NIT","Id":"901684896","digitoVerificacion":"5","direccion":"La ranchería Marmato","ciudad":"Marmato","telefono":"-3147599151-","nombreContacto":"INVERSIONES FERRETERÍAS J&M S.A.S 000","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"INVERSIONES FERREZONE SAS","tipoId":"NIT","Id":"901623489","digitoVerificacion":"1","direccion":"MEDELLIN","ciudad":"Medellín","telefono":"604-3052254069-","nombreContacto":"INVERSIONES FERREZONE SAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"INVERSIONES H CASTILLO  SAS","tipoId":"NIT","Id":"901259620","digitoVerificacion":"0","direccion":"CL 48#56-05","ciudad":"Bello","telefono":"604-3016546-","nombreContacto":"INVERSIONES H CASTILLO  SAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Itaí corpbanca colombia s a","tipoId":"NIT","Id":"890903937","digitoVerificacion":"0","direccion":"Cl. 94 #15-11","ciudad":"Bogotá","telefono":"-5818181-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Jaime Alberto Valdes Montoya","tipoId":"Cédula de ciudadanía","Id":"1035126268","digitoVerificacion":"","direccion":"ANORI - PARQUE PRINCIPAL","ciudad":"Anorí","telefono":"-3106681146-","nombreContacto":"Jaime Alberto Valdes Montoya","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Jairo Valdez","tipoId":"Cédula de ciudadanía","Id":"1035127753","digitoVerificacion":"","direccion":"ANORI - PARQUE PRINCIPAL","ciudad":"Anorí","telefono":"-3207086082-","nombreContacto":"Jairo Valdez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"JAVIER TIENDA","tipoId":"Cédula de ciudadanía","Id":"78932452","digitoVerificacion":"9","direccion":"CRA57#28-36","ciudad":"Bello","telefono":"604-00000-","nombreContacto":"JAVIER TIENDA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"JE DISEÑO Y CONSTRUCCION S.A.S.","tipoId":"NIT","Id":"900648762","digitoVerificacion":"0","direccion":"CR 47 # 51-33","ciudad":"Bello","telefono":"604-3117922445-000","nombreContacto":"JHON","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Jeynson Eduardo Gonzalez Jimenez","tipoId":"Cédula de ciudadanía","Id":"1035126189","digitoVerificacion":"","direccion":"ANORI - PARQUE PRINCIPAL","ciudad":"Anorí","telefono":"-3217687648-","nombreContacto":"Jeynson Eduardo Gonzalez Jimenez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"JHON FREDY CORREA","tipoId":"NIT","Id":"71689119","digitoVerificacion":"3","direccion":"cra42B#37B22","ciudad":"Bello","telefono":"604--","nombreContacto":"JHON FREDY CORREA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"JOHN FREDY MEJIA","tipoId":"Cédula de ciudadanía","Id":"1234568","digitoVerificacion":"1","direccion":"","ciudad":"","telefono":"604-3153362330-","nombreContacto":"JOHN FREDY MEJIA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Jorge Hernan Loaiza Galeano","tipoId":"Cédula de ciudadanía","Id":"1020460320","digitoVerificacion":"","direccion":"","ciudad":"Bello","telefono":"-3022280114-","nombreContacto":"Jorge Hernan Loaiza Galeano","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Jose arturo Vasquez velasquez","tipoId":"Cédula de ciudadanía","Id":"1017149776","digitoVerificacion":"0","direccion":"Carrera 28 # 107=77","ciudad":"Medellín","telefono":"-3022399596-","nombreContacto":"Jose arturo Vasquez velasquez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"JOSÉ LEONARDO OROZCO MEJIA","tipoId":"Cédula de ciudadanía","Id":"70301020","digitoVerificacion":"4","direccion":"Calle 28 Cra 70-13Barrio los girasoles paris","ciudad":"Bello","telefono":"-3015013541-","nombreContacto":"JOSÉ LEONARDO OROZCO MEJIA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Juan Camilo Henao","tipoId":"Cédula de ciudadanía","Id":"1046904446","digitoVerificacion":"","direccion":"SEGOVIA","ciudad":"Segovia","telefono":"-3215955263-","nombreContacto":"Juan Camilo Henao","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"JUAN CARLOS (AGRO CALECO) MONTOYA CASTAÑO","tipoId":"Cédula de ciudadanía","Id":"1035388067","digitoVerificacion":"7","direccion":"CL 21#20-23","ciudad":"Bello","telefono":"604-3216413196-","nombreContacto":"JUAN CARLOS MONTOYA CASTAÑO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Juan Guillermo Salazar Martinez","tipoId":"Cédula de ciudadanía","Id":"70926840","digitoVerificacion":"","direccion":"ANORI - PARQUE PRINCIPAL","ciudad":"Anorí","telefono":"-3127574090-","nombreContacto":"Juan Guillermo Salazar Martinez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Juan Sebastian Quintero","tipoId":"Cédula de ciudadanía","Id":"1042063725","digitoVerificacion":"5","direccion":"","ciudad":"Bello","telefono":"-3022308679-","nombreContacto":"Juan Sebastian Quintero Ramirez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Julian Dario Hernandez Quintana","tipoId":"Cédula de ciudadanía","Id":"71082588","digitoVerificacion":"","direccion":"CORREGIMIENTO MACHUCA SEGOVIA","ciudad":"Segovia","telefono":"-3122841869-","nombreContacto":"Julian Dario Hernandez Quintana","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Julian Peña Florez","tipoId":"Cédula de ciudadanía","Id":"1000441034","digitoVerificacion":"3","direccion":"cr 82 ff # 100 f 22","ciudad":"Medellín","telefono":"-3148299422-","nombreContacto":"Julian Peña Florez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Julio Cesar Peña Ortiz","tipoId":"Cédula de ciudadanía","Id":"1035126257","digitoVerificacion":"","direccion":"ANORI - PARQUE PRINCIPAL","ciudad":"Anorí","telefono":"-3106816503-","nombreContacto":"Julio Cesar Peña Ortiz","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"LA CABALGATA","tipoId":"NIT","Id":"901113902","digitoVerificacion":"2","direccion":"CALLE46#54-80","ciudad":"Medellín","telefono":"604-4484039-","nombreContacto":"LA CABALGATA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"LA CABALGATA CONSTRUPINTURAS","tipoId":"NIT","Id":"900529523","digitoVerificacion":"7","direccion":"CLL 45 #55-90","ciudad":"Medellín","telefono":"604-3217811915-","nombreContacto":"LA CABALGATA CONSTRUPINTURAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"La Equidad Seguros","tipoId":"NIT","Id":"830008686","digitoVerificacion":"","direccion":"Carrera 9 A 99-07","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"LA ESTACION DEPOSITO FERRETERÍA","tipoId":"Cédula de ciudadanía","Id":"7411358451","digitoVerificacion":"3","direccion":"DG51#43-45","ciudad":"Bello","telefono":"604-6171448-000","nombreContacto":"LA ESTACION DEPOSITO FERRETERÍA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"La Torre La Torre","tipoId":"Cédula de ciudadanía","Id":"6244135","digitoVerificacion":"5","direccion":"Cl 26 A # 58D 22","ciudad":"Bello","telefono":"-3216510981-","nombreContacto":"Alejandra Arismendi","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"LAUDAN OPERACIONES S.A.S","tipoId":"NIT","Id":"9013545331","digitoVerificacion":"8","direccion":"cra64aa113a34","ciudad":"Medellín","telefono":"604-5018797-","nombreContacto":"LAUDAN OPERACIONES S.A.S","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"LAURA MATINEZ MONTOYA","tipoId":"Cédula de ciudadanía","Id":"1035440982","digitoVerificacion":"3","direccion":"CALLE50#48-41","ciudad":"Medellín","telefono":"604--","nombreContacto":"LAURA MATINEZ MONTOYA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"LEIDY SUAREZ","tipoId":"Cédula de ciudadanía","Id":"43915258","digitoVerificacion":"7","direccion":"CALLE 110 #68A109","ciudad":"Bello","telefono":"604-4888307-","nombreContacto":"LEIDY SUAREZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Leon Arvey Espinosa Morales","tipoId":"Cédula de ciudadanía","Id":"1035127809","digitoVerificacion":"","direccion":"ANORI - PARQUE PRINCIPAL","ciudad":"Anorí","telefono":"-3135407535-","nombreContacto":"Leon Arvey Espinosa Morales","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Liberty","tipoId":"NIT","Id":"860008645","digitoVerificacion":"","direccion":"Ac 72 #10 - 07","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"LLAVES EL POBLADO","tipoId":"NIT","Id":"3352895","digitoVerificacion":"6","direccion":"CLL 10 #53B-18","ciudad":"Medellín","telefono":"57-3122108334-","nombreContacto":"LLAVES EL POBLADO LLAVES EL POBLADO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"LUISA FERNANDA CANO LOPEZ","tipoId":"Cédula de ciudadanía","Id":"1020421968","digitoVerificacion":"4","direccion":"CALLE 23 # 53-69","ciudad":"Bello","telefono":"604-3024438030-","nombreContacto":"LUISA FERNANDA CANO LOPEZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"LUISA FERNANDA SANCHEZ SALAZAR","tipoId":"Cédula de ciudadanía","Id":"1017277037","digitoVerificacion":"4","direccion":"CALLA 45 #34-48","ciudad":"Medellín","telefono":"604-5584847-","nombreContacto":"LUISA FERNANDA SANCHEZ SALAZAR","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"LUZ MARINA CAÑAVERAL","tipoId":"NIT","Id":"43433231","digitoVerificacion":"1","direccion":"cra 80#98d-19","ciudad":"","telefono":"604-5872804-","nombreContacto":"LUZ MARINA CAÑAVERAL LUZ MARINA CAÑAVERAL","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"MAKICENTER MAZ S.A.S","tipoId":"NIT","Id":"901144023","digitoVerificacion":"6","direccion":"CR 51 # 41 144 LC 131","ciudad":"Medellín","telefono":"604--","nombreContacto":"YELY","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Mallamas","tipoId":"NIT","Id":"837000084","digitoVerificacion":"","direccion":"Cra. 3 #3-156","ciudad":"Ipiales","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Mapfre Colombia Vida Seguros S.A.","tipoId":"NIT","Id":"830054904","digitoVerificacion":"","direccion":"Cl. 82 #10-45","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"MARCOS RAVE","tipoId":"Cédula de ciudadanía","Id":"631473254","digitoVerificacion":"2","direccion":"CL 65 84-88 Robledo parque","ciudad":"Medellín","telefono":"604-3054128856-","nombreContacto":"MARCOS RAVE","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"MARIA ISABEL OROZCO OSPINA","tipoId":"Cédula de ciudadanía","Id":"1036518019","digitoVerificacion":"6","direccion":"CRA 17 #7-36","ciudad":"Girardota","telefono":"604-3006908420-@604-4236074-","nombreContacto":"MARIA ISABEL OROZCO OSPINA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"MATRIX GIROS Y SERVICIOS S.A.S","tipoId":"NIT","Id":"900327256","digitoVerificacion":"8","direccion":"CALLE 26#69D-91","ciudad":"Medellín","telefono":"604-0180009669-","nombreContacto":"MATRIX GIROS SERVICIOS S.A.S","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"MAURICIO VILLEGAS","tipoId":"Cédula de ciudadanía","Id":"9356231","digitoVerificacion":"6","direccion":"","ciudad":"Medellín","telefono":"604-3008346025-","nombreContacto":"MAURICIO VILLEGAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"MAURO JOSE VARELA RIVERO","tipoId":"Tarjeta de extranjería","Id":"1452091","digitoVerificacion":"","direccion":"CARRERA 26 48-60","ciudad":"Medellín","telefono":"604-3218234885-","nombreContacto":"MAURO JOSE VARELA RIVERO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Medimás","tipoId":"NIT","Id":"901097473","digitoVerificacion":"1","direccion":"Ak. 24 #72-91","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Medimás Movilidad","tipoId":"NIT","Id":"901097473","digitoVerificacion":"","direccion":"Ak. 24 #72-91","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"MELISA BARBOSA","tipoId":"Cédula de ciudadanía","Id":"1039697820","digitoVerificacion":"7","direccion":"CRA 57 #38-220","ciudad":"Bello","telefono":"604-3218676607-","nombreContacto":"MELISA BARBOSA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Metales pesados","tipoId":"NIT","Id":"901368521","digitoVerificacion":"4","direccion":"Carrera 50b#5 sur=21","ciudad":"Medellín","telefono":"-3113158279-","nombreContacto":"Fernando Gutierrez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Metrobrero Metrobrero","tipoId":"Cédula de ciudadanía","Id":"98579959","digitoVerificacion":"","direccion":"Cr 53 # 34-27","ciudad":"Bello","telefono":"-3054681226-","nombreContacto":"Aalvaro LONDOÑO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"MIGUEL GOMEZ Y COMPAÑIA S.A.S","tipoId":"NIT","Id":"890900137","digitoVerificacion":"","direccion":"Calle 100 Sur # 45 - 345 Bodega 105","ciudad":"Medellín","telefono":"604-6043380-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"MINSEG COLOMBIA SAS","tipoId":"NIT","Id":"901370282","digitoVerificacion":"5","direccion":"Calle 21a54-53 guayabal","ciudad":"Medellín","telefono":"57-3215318211-","nombreContacto":"Juan Camilo Quintero MarÍn","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"MOMPIRRI","tipoId":"NIT","Id":"8963521","digitoVerificacion":"7","direccion":"","ciudad":"Medellín","telefono":"604-3146541211-","nombreContacto":"RUBEN","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"MONICA ZAPATA","tipoId":"Cédula de ciudadanía","Id":"21533565","digitoVerificacion":"3","direccion":"","ciudad":"","telefono":"--","nombreContacto":"MONICA ZAPATA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Moto Planet","tipoId":"Cédula de ciudadanía","Id":"98773180","digitoVerificacion":"0","direccion":"cr 79 # 1-137","ciudad":"Medellín","telefono":"-3016897888-","nombreContacto":"Mario Gomez Toro","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"MULTISERVICIOS LA BOMBAY","tipoId":"Cédula de ciudadanía","Id":"71725126","digitoVerificacion":"1","direccion":"CRA 43C#68 SUR 45","ciudad":"Sabaneta","telefono":"-3217421400-","nombreContacto":"ALEJANDRO ANGEL","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"MUNDIAL DE REPUESTOS DE MOTOS","tipoId":"NIT","Id":"811044788","digitoVerificacion":"6","direccion":"CALLE 38 #52-30","ciudad":"Medellín","telefono":"604-2324513-","nombreContacto":"SERGIO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Mutual Ser","tipoId":"NIT","Id":"806008394","digitoVerificacion":"","direccion":"Carretera Troncal No. 71 B - 105","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"NEXXO FERRETERÍA","tipoId":"Cédula de ciudadanía","Id":"2236231123","digitoVerificacion":"7","direccion":"CALLE 55#37-42","ciudad":"Medellín","telefono":"604-3103851481-","nombreContacto":"NEXXO FERRETERÍA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"NIQUIA LA 44","tipoId":"Cédula de ciudadanía","Id":"7834236376","digitoVerificacion":"1","direccion":"DG59#44-02","ciudad":"Bello","telefono":"604-310638765-","nombreContacto":"NIQUIA LA 44","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"NOLASCO SIERRA","tipoId":"Cédula de ciudadanía","Id":"3236312","digitoVerificacion":"8","direccion":"carrera 19#17=53","ciudad":"San Roque","telefono":"604-3136917652-","nombreContacto":"NOLASCO SIERRA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Norberto de jesus Valdes Garcia","tipoId":"Cédula de ciudadanía","Id":"70928104","digitoVerificacion":"","direccion":"ANORI - PARQUE PRINCIPAL","ciudad":"Anorí","telefono":"-3148128565-","nombreContacto":"Norberto de jesus Valdes Garcia","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Nueva Eps","tipoId":"NIT","Id":"900156264","digitoVerificacion":"","direccion":"","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Numar de jesus Torres Montoya","tipoId":"Cédula de ciudadanía","Id":"70928166","digitoVerificacion":"","direccion":"ANORI-PARQUE PRINCIPAL","ciudad":"Anorí","telefono":"-3122031122-","nombreContacto":"Numar de jesus Torres Montoya","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Numar Tabares","tipoId":"Cédula de ciudadanía","Id":"1035127629","digitoVerificacion":"","direccion":"ANORI - PARQUE PRINCIPAL","ciudad":"Anorí","telefono":"-3508867135-","nombreContacto":"Numar Tabares","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ODEILDA GOMEZ PEREZ","tipoId":"Cédula de ciudadanía","Id":"42760903","digitoVerificacion":"9","direccion":"No aplica","ciudad":"Bello","telefono":"604-0000000-000","nombreContacto":"ODEILDA GOMEZ PEREZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"OLAYA CONSULTORA Y CONSTRUCTORA SAS","tipoId":"NIT","Id":"901408541","digitoVerificacion":"4","direccion":"calle 12#655- barrio versalles","ciudad":"Medellín","telefono":"604-3183915833-","nombreContacto":"OLAYA CONSULTORA Y CONSTRUCTORA SAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Old Mutual","tipoId":"NIT","Id":"800253055","digitoVerificacion":"","direccion":"Avenida 19 #109A-30","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Old Mutual Alternativo","tipoId":"NIT","Id":"830125132","digitoVerificacion":"","direccion":"Avenida 19 #109A-30","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"PAPELERIA MARCEBAS","tipoId":"Cédula de ciudadanía","Id":"32319050","digitoVerificacion":"6","direccion":"Cra58#24A-35","ciudad":"Bello","telefono":"604-3127343298-","nombreContacto":"PAPELERIA MARCEBAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"PARQUEADERO DIAZ","tipoId":"NIT","Id":"811028486","digitoVerificacion":"1","direccion":"CRA 55#46-29","ciudad":"Medellín","telefono":"604-2865423-","nombreContacto":"PARQUEADERO DIAZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"PAULA AGUDELO","tipoId":"Cédula de ciudadanía","Id":"29180587","digitoVerificacion":"","direccion":"","ciudad":"Bello","telefono":"--","nombreContacto":"PAULA AGUDELO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Pensiones de Antioquia","tipoId":"NIT","Id":"800216278","digitoVerificacion":"","direccion":"Cl. 55 #49-100","ciudad":"Medellín","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Pensiones y Cesantías Santander","tipoId":"NIT","Id":"800224827","digitoVerificacion":"","direccion":"Carrera 10 #27-27 Local 147","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"PESCA SIN LIMITE","tipoId":"Cédula de ciudadanía","Id":"22101920","digitoVerificacion":"5","direccion":"calle50#53-84","ciudad":"Medellín","telefono":"604-3787049-","nombreContacto":"MARGARITA MARIA JARAMILLO TABARES","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Pijaosalud","tipoId":"NIT","Id":"809008362","digitoVerificacion":"","direccion":"Carrera 7A #79","ciudad":"Ibagué","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"PINTURAS  HYC","tipoId":"NIT","Id":"43906817","digitoVerificacion":"6","direccion":"CRA 52 # 3SUR10 GUAYABAL","ciudad":"Medellín","telefono":"-3137565962-","nombreContacto":"EMILSEN DE JESUS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"PINTURAS Y YESOS SAS","tipoId":"NIT","Id":"811008778","digitoVerificacion":"1","direccion":"CRA48#42-73","ciudad":"Medellín","telefono":"604-4481802-","nombreContacto":"PINTURAS Y YESOS SAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Pintuvale Pintuvale","tipoId":"Cédula de ciudadanía","Id":"32503095","digitoVerificacion":"5","direccion":"Cr 52 # 3 sur 10","ciudad":"Medellín","telefono":"-3014462972-","nombreContacto":"Maria Patricia Sierra","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"PLASTIKELGRI","tipoId":"NIT","Id":"8936523","digitoVerificacion":"7","direccion":"BELLO","ciudad":"Bello","telefono":"604-3128844401-","nombreContacto":"PLASTIKELGRI","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Porvenir S.A","tipoId":"NIT","Id":"800224808","digitoVerificacion":"","direccion":"Carrera 13 No. 26 A-65, Torre B","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Positiva Compañía de Seguros","tipoId":"NIT","Id":"860011153","digitoVerificacion":"","direccion":"Autonorte #94-72","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"PRIMAX  BELLO","tipoId":"NIT","Id":"900264242","digitoVerificacion":"3","direccion":"CRA 50#43-69","ciudad":"Bello","telefono":"604-4526470-","nombreContacto":"PRIMAX  BELLO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"PRIMAX EL BOSQUE","tipoId":"NIT","Id":"800219130","digitoVerificacion":"3","direccion":"CRA 52#78-20","ciudad":"Medellín","telefono":"-4082209-","nombreContacto":"PRIMAX EL BOSQUE","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"PROMETALICOS ARMO S.A.S","tipoId":"NIT","Id":"811003751","digitoVerificacion":"9","direccion":"CRA 45A 63-23","ciudad":"Itagui","telefono":"604-4447214-","nombreContacto":"SIMON","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"PROSEGUR VIGILANCIA Y SEGURIDAD PRIVADA LTDA","tipoId":"NIT","Id":"890401802","digitoVerificacion":"0","direccion":"cra16-33-29","ciudad":"Bello","telefono":"604-3183515058-","nombreContacto":"proswgur","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Protección S.A","tipoId":"NIT","Id":"800229739","digitoVerificacion":"","direccion":"","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"PUNTO FERRETERO JR","tipoId":"NIT","Id":"11003093","digitoVerificacion":"9","direccion":"cra44#70A04","ciudad":"Medellín","telefono":"604-3106407079-","nombreContacto":"ROBERTO MORA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Puredetailing Puredetailing","tipoId":"Cédula de ciudadanía","Id":"8028898","digitoVerificacion":"","direccion":"Cr 80 # 52 B 14","ciudad":"Medellín","telefono":"-3137482702-","nombreContacto":"Ruben Castro Villa","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Ramiro Antonio Rua Ospina","tipoId":"Cédula de ciudadanía","Id":"15537369","digitoVerificacion":"","direccion":"SEGOVIA","ciudad":"Segovia","telefono":"-3146549177-","nombreContacto":"Ramiro Antonio Rua Ospina","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"REPUESTOS PAL HOGAR SAS","tipoId":"NIT","Id":"900745652","digitoVerificacion":"","direccion":"cra 51 #41-152","ciudad":"Medellín","telefono":"-3146038561-","nombreContacto":"Hernando Palacio","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"RESORTES JL","tipoId":"NIT","Id":"1111","digitoVerificacion":"4","direccion":"Cr 51 # 41-76","ciudad":"Medellín","telefono":"604-4444134-","nombreContacto":"JESUS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"RINCARD SAS","tipoId":"NIT","Id":"9007040901","digitoVerificacion":"6","direccion":"DIAGONAL52#10-269","ciudad":"Medellín","telefono":"604-6049271-","nombreContacto":"RINCARD SAS EDS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Roberto Gonzalez","tipoId":"Cédula de ciudadanía","Id":"70928639","digitoVerificacion":"","direccion":"","ciudad":"Anorí","telefono":"-3207323470-","nombreContacto":"Roberto Gonzalez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"RODMAN SEGURA SANCHEZ","tipoId":"Cédula de ciudadanía","Id":"79690438","digitoVerificacion":"9","direccion":"CR 52 CARABOBO 39-17","ciudad":"Medellín","telefono":"604-3004505180-","nombreContacto":"RODMAN SEGURA SANCHEZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ROSALBA ARIAS","tipoId":"Cédula de ciudadanía","Id":"43005781","digitoVerificacion":"3","direccion":"CRA 72 #20E57","ciudad":"Bello","telefono":"604-4614386-@604-3103900170-","nombreContacto":"BERNARDO ARROYAVE","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Salud MIA EPS","tipoId":"NIT","Id":"900914254","digitoVerificacion":"1","direccion":"","ciudad":"Tunja","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Salud Total Eps","tipoId":"NIT","Id":"800130907","digitoVerificacion":"4","direccion":"","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Saludvida","tipoId":"NIT","Id":"830074184","digitoVerificacion":"9","direccion":"","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Saludvida S.A. EPS Moviilidad","tipoId":"NIT","Id":"830074184","digitoVerificacion":"","direccion":"Cra. 7 #48-32","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"SAMUEL ENRIQUE GOMEZ LOPEZ","tipoId":"Cédula de ciudadanía","Id":"71192467","digitoVerificacion":"7","direccion":"VEREDA MINAS DEL VAPOR","ciudad":"Puerto BerrÍo","telefono":"604-3206998107-","nombreContacto":"SAMUEL ENRIQUE GOMEZ LOPEZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Sandra Viviana Franco Jaramillo","tipoId":"Cédula de ciudadanía","Id":"32090685","digitoVerificacion":"","direccion":"AMALFI","ciudad":"Amalfi","telefono":"-3235834390-","nombreContacto":"Sandra Viviana Franco Jaramillo","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Sanitas","tipoId":"NIT","Id":"800251440","digitoVerificacion":"6","direccion":"Cra 49b 94 40","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Savia Salud","tipoId":"NIT","Id":"900604350","digitoVerificacion":"","direccion":"Cra. 56b #49-29","ciudad":"Medellín","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Scotiabank colpatria s.a.","tipoId":"NIT","Id":"860034594","digitoVerificacion":"1","direccion":"Cl 20 # 82 - 52","ciudad":"Bogotá","telefono":"-6057000-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"SEBASTIAN GRISALES MECANICO","tipoId":"Cédula de ciudadanía","Id":"1001228179","digitoVerificacion":"4","direccion":"AV33#69-45","ciudad":"Medellín","telefono":"604-3013148403-","nombreContacto":"SEBASTIAN GRISALES","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Sebastian Restrepo Gonzalez","tipoId":"Cédula de ciudadanía","Id":"1000896762","digitoVerificacion":"1","direccion":"cr 84 # 95 30","ciudad":"Medellín","telefono":"604-3246442551-","nombreContacto":"Sebastian Restrepo Gonzalez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"SECRETARIA DE TRANSITO SABANETA","tipoId":"NIT","Id":"123456","digitoVerificacion":"3","direccion":"CLL 75 SUR # 45-30,","ciudad":"Sabaneta","telefono":"604-4406803-","nombreContacto":"JUAN","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Secretaría Distrital de Hacienda","tipoId":"NIT","Id":"899999061","digitoVerificacion":"","direccion":"Carrera 30 N 25-90","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"SECURITY FULL S.A.S","tipoId":"NIT","Id":"900765301","digitoVerificacion":"1","direccion":"CRR 53 N 50-51 INT 307","ciudad":"Medellín","telefono":"604-3108990795-","nombreContacto":"SECURITY FULL S.A.S","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Seguros Bolívar","tipoId":"NIT","Id":"860002503","digitoVerificacion":"","direccion":"Cra. 12 #79-43","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Seguros de riesgos laborales suramericana S.A.","tipoId":"NIT","Id":"800256161","digitoVerificacion":"","direccion":"Avenida el Dorado N. 68 B - 85 Piso 9","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Seguros de Vida Aurora","tipoId":"NIT","Id":"860022137","digitoVerificacion":"","direccion":"Cra. 7 #74-21","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Servicio Nacional de Aprendizaje","tipoId":"NIT","Id":"899999034","digitoVerificacion":"","direccion":"Calle 57 No. 8-69","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Servicio Occidental De Salud","tipoId":"NIT","Id":"805001157","digitoVerificacion":"2","direccion":"65, Cl. 67 #7","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"SERVICIOS  POSTALES NACIONALES S.A.S","tipoId":"NIT","Id":"900062917","digitoVerificacion":"9","direccion":"DIAGONAL25G#95A55","ciudad":"Bello","telefono":"604-4722005-","nombreContacto":"SERVICIOS  POSTALES NACIONALES S.A.S","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"SERVIENTREGA","tipoId":"NIT","Id":"860512330","digitoVerificacion":"3","direccion":"CALLE6#34A11","ciudad":"Medellín","telefono":"604-7700200-","nombreContacto":"SERVIENTREGA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"SIGMAPLAS ALPUJARRA","tipoId":"NIT","Id":"900777844","digitoVerificacion":"9","direccion":"cra51#41-23","ciudad":"Bello","telefono":"604-6045883-","nombreContacto":"SIGMAPLAS ALPUJARRA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"SIIGO","tipoId":"NIT","Id":"830048145","digitoVerificacion":"8","direccion":"CEA 18 #79A42","ciudad":"Bogotá","telefono":"604-3184114466-","nombreContacto":"SIIGO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Sistema integrado multiple de pagos electronicos S.A.","tipoId":"NIT","Id":"900097333","digitoVerificacion":"9","direccion":"Calle 98 # 22-64","ciudad":"Bogotá","telefono":"-432949-","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Skandia","tipoId":"NIT","Id":"800148514","digitoVerificacion":"","direccion":"Avenida 19 No. 113-30","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"SOLDADURAS Y ACCESORIOS .A.S","tipoId":"NIT","Id":"901491223","digitoVerificacion":"1","direccion":"CRR 51 N 41-144 METROCENTRO 2 LOCAL 118","ciudad":"Bello","telefono":"604-3164954447-","nombreContacto":"SERGIO RINCON","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"SOLUCIONES DE AUTOMATIZACION Y ELECTRICIDAD S.A.S","tipoId":"NIT","Id":"901435447","digitoVerificacion":"4","direccion":"cl 52A#55A08","ciudad":"Bello","telefono":"604-4310430-","nombreContacto":"MARIA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"SOLUCIONES QUÍMICAS MAXQUÍMICOS S.A.S","tipoId":"NIT","Id":"900896615","digitoVerificacion":"9","direccion":"","ciudad":"Medellín","telefono":"-3225686820-","nombreContacto":"Francisco","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"SONAKY GRUP SAS","tipoId":"NIT","Id":"900816058","digitoVerificacion":"4","direccion":"CR 55 # 46 65 OF 801 ED ARCA","ciudad":"Medellín","telefono":"604-3223083-","nombreContacto":"WILMAR","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Suceramica Suceramica","tipoId":"Cédula de ciudadanía","Id":"43740594","digitoVerificacion":"4","direccion":"Cr 48 # 47-80","ciudad":"Bello","telefono":"-3104593370-","nombreContacto":"Gloria Sanchez","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"SUMINISTROS FARGO","tipoId":"Cédula de ciudadanía","Id":"901259705","digitoVerificacion":"5","direccion":"","ciudad":"Medellín","telefono":"604-2517471-","nombreContacto":"SUMINISTROS FARGO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Suramericana","tipoId":"NIT","Id":"890903407","digitoVerificacion":"9","direccion":"Cra 11 n 93 46","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"SURTICANECAS","tipoId":"NIT","Id":"3436540","digitoVerificacion":"9","direccion":"CALLE 57#54-180","ciudad":"Medellín","telefono":"604-3128312688-","nombreContacto":"SURTICANECAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"TECNIEMPAQUES S.A.S","tipoId":"NIT","Id":"800121327","digitoVerificacion":"4","direccion":"CRA 51 N 41-37","ciudad":"Medellín","telefono":"604-6042620517-","nombreContacto":"TECNIEMPAQUES S.A.S TECNIEMPAQUES S.A.S","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"TECNOHITACHI S.A.S","tipoId":"NIT","Id":"811031676","digitoVerificacion":"3","direccion":"CRA51 #34-65","ciudad":"Medellín","telefono":"604--","nombreContacto":"TECNOHITACHI S.A.S","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Terceros saldos iniciales","tipoId":"NIT","Id":"999999","digitoVerificacion":"1","direccion":"","ciudad":"","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"TERECITA DEL CONSUELO RIOS ARISMENDI","tipoId":"Cédula de ciudadanía","Id":"22028440","digitoVerificacion":"1","direccion":"CALLE DEL COMERCIO #20-70","ciudad":"Caracolí","telefono":"604-3216397593-","nombreContacto":"TERECITA DEL CONSUELO RIOS ARISMENDI","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"TEXACO HATO VIEJO","tipoId":"NIT","Id":"811023791","digitoVerificacion":"9","direccion":"CALLE40#50-211","ciudad":"Bello","telefono":"604-4255252-","nombreContacto":"TEXACO HATO VIEJO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"TIENDA SAS","tipoId":"NIT","Id":"901325511","digitoVerificacion":"6","direccion":"CALLE 36#80-17","ciudad":"Medellín","telefono":"604-3209595-","nombreContacto":"TIENDA SAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"TIGO","tipoId":"NIT","Id":"830114921","digitoVerificacion":"1","direccion":"Carrera 16 No. 11 A Sur 100","ciudad":"Medellín","telefono":"604-5150505-","nombreContacto":"TIGO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"TORNILLOS Y PARTES PLAZA S.A","tipoId":"NIT","Id":"800112440","digitoVerificacion":"0","direccion":"CRA50#40 12/26","ciudad":"Medellín","telefono":"604-4449189-","nombreContacto":"TORNILLOS Y PARTES PLAZA S.A","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"TORNISUR","tipoId":"NIT","Id":"71396573","digitoVerificacion":"6","direccion":"CRA 51 #126Asur","ciudad":"Caldas","telefono":"-333333-","nombreContacto":"TORNISUR TORNISUR","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"TRANSITO MARTINEZ JIMENEZ","tipoId":"Cédula de ciudadanía","Id":"60327061","digitoVerificacion":"2","direccion":"calle 43 # 50-71","ciudad":"Itagui","telefono":"604-3125850337-@604-3053173140-","nombreContacto":"TRANSITO MARTINEZ JIMENEZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"TRANSPORTE LOS FARALLONES","tipoId":"NIT","Id":"811009942","digitoVerificacion":"6","direccion":"Cra. 65 #8B-91","ciudad":"Medellín","telefono":"604-3614521-","nombreContacto":"TRANSPORTE LOS FARALLONES","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"TRANSPORTES SALGAR","tipoId":"NIT","Id":"890911260","digitoVerificacion":"7","direccion":"CRA52A#39-57","ciudad":"Medellín","telefono":"604-2322276-","nombreContacto":"TRANSPORTES SALGAR","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"TRANSPORTES SEGOVIA Y CIA SCA","tipoId":"NIT","Id":"890902878","digitoVerificacion":"1","direccion":"TERMINAL","ciudad":"Medellín","telefono":"604-4480662-","nombreContacto":"JOHN","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"TRES ESQUINAS","tipoId":"NIT","Id":"002","digitoVerificacion":"5","direccion":"CRA83#102-A15 PICACHO","ciudad":"Medellín","telefono":"604-3105965188-","nombreContacto":"TRES ESQUINAS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Universidad de Antioquia","tipoId":"NIT","Id":"890980040","digitoVerificacion":"","direccion":"Cl. Barranquilla #53 - 108","ciudad":"Medellín","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Universidad de Cartagena","tipoId":"NIT","Id":"890480123","digitoVerificacion":"","direccion":"Cra. 6 #36-100","ciudad":"Cartagena","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Universidad de Córdoba","tipoId":"NIT","Id":"891080031","digitoVerificacion":"","direccion":"Carrera 6 No. 76-103","ciudad":"Montería","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Universidad de Nariño","tipoId":"NIT","Id":"800118954","digitoVerificacion":"","direccion":"Clle 18 Cr 50","ciudad":"Pasto","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Universidad del Atlántico","tipoId":"NIT","Id":"890102257","digitoVerificacion":"","direccion":"Km 7 Via Puerto","ciudad":"Barranquilla","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Universidad del Cauca","tipoId":"NIT","Id":"891500319","digitoVerificacion":"","direccion":"Cl. 5 #4-70","ciudad":"Popayán","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Universidad del Valle","tipoId":"NIT","Id":"890399010","digitoVerificacion":"","direccion":"Cl. 13 #100-00","ciudad":"Cali","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Universidad Industrial de Santander","tipoId":"NIT","Id":"890203183","digitoVerificacion":"","direccion":"Cl. 120a #7 - 36","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Universidad Nacional de Colombia","tipoId":"NIT","Id":"899999063","digitoVerificacion":"","direccion":"Cra 45","ciudad":"Bogotá","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Universidad Pedagógica - UPTC","tipoId":"NIT","Id":"891800330","digitoVerificacion":"","direccion":"Avenida Central del Norte 39-115","ciudad":"Tunja","telefono":"","nombreContacto":"","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"VALERIA YEPES","tipoId":"Cédula de ciudadanía","Id":"1037653024","digitoVerificacion":"4","direccion":"","ciudad":"Bello","telefono":"--","nombreContacto":"VALERIA YEPES","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"VALERIA YEPES CANO","tipoId":"Cédula de ciudadanía","Id":"1035878192","digitoVerificacion":"2","direccion":"CRA89#23-15","ciudad":"","telefono":"604-3215310114-","nombreContacto":"VALERIA YEPES CANO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"VARIEDADES CROMOS","tipoId":"Cédula de ciudadanía","Id":"70826993","digitoVerificacion":"9","direccion":"cra55calle #46-40","ciudad":"Bello","telefono":"604-3145830285-","nombreContacto":"VARIEDADES CROMOS","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Variedades El Suiche","tipoId":"Cédula de ciudadanía","Id":"43074954","digitoVerificacion":"","direccion":"cr 74 # 105b-13","ciudad":"Medellín","telefono":"-3207886584-","nombreContacto":"Fatima Del Socorro Arias Higuita","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"variedades la 100","tipoId":"Cédula de ciudadanía","Id":"72013379","digitoVerificacion":"","direccion":"carrera 52 # 100 - 43","ciudad":"Medellín","telefono":"-3107271373-","nombreContacto":"Mirdre Ortega","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"VIVIANA BENITEZ","tipoId":"Cédula de ciudadanía","Id":"1039288735","digitoVerificacion":"4","direccion":"PARQUE PRINCIPAL","ciudad":"Cisneros","telefono":"604-3146502026-","nombreContacto":"VIVIANA BENITEZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"WACA TOOLS","tipoId":"NIT","Id":"1037616762","digitoVerificacion":"4","direccion":"CRA52#49-76","ciudad":"Medellín","telefono":"604-3024182325-","nombreContacto":"CAMILO","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"WILFER ZAPATA","tipoId":"Cédula de ciudadanía","Id":"743213123","digitoVerificacion":"8","direccion":"CALLE25ACRA75-5","ciudad":"Bello","telefono":"604-5872804-","nombreContacto":"WILFER ZAPATA","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"WILLIAM DARIO HERNANDEZ GOMEZ","tipoId":"Cédula de ciudadanía","Id":"1128397513","digitoVerificacion":"6","direccion":"","ciudad":"","telefono":"-3106062581-","nombreContacto":"WILLIAM DARIO HERNANDEZ GOMEZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Wilmar Augusto Lorza Palacio","tipoId":"Cédula de ciudadanía","Id":"15537771","digitoVerificacion":"","direccion":"REMEDIOS - ANTIOQUIA","ciudad":"Remedios","telefono":"-3045486785-","nombreContacto":"Wilmar Augusto Lorza Palacio","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"WILSON CARDONA AGUIRRE","tipoId":"Cédula de ciudadanía","Id":"1036668187","digitoVerificacion":"8","direccion":"","ciudad":"Medellín","telefono":"604-3015889399-","nombreContacto":"WILSON CARDONA AGUIRRE","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"Yaris elena Echavarria holguín","tipoId":"Cédula de ciudadanía","Id":"1192745878","digitoVerificacion":"5","direccion":"Parque","ciudad":"Segovia","telefono":"-3205303081-","nombreContacto":"Yaris elena Echavarria holguín","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"YEISON HERNANDEZ","tipoId":"Cédula de ciudadanía","Id":"1128385256","digitoVerificacion":"6","direccion":"CR 59#27B510","ciudad":"Bello","telefono":"604-3114709554-","nombreContacto":"YEISON HERNANDEZ","estado":"Activo","empresa":"00000"}
      ,
      {"nombreTercero":"ZONA NORTE","tipoId":"Cédula de ciudadanía","Id":"1017217164","digitoVerificacion":"5","direccion":"","ciudad":"Bello","telefono":"-3022277402-","nombreContacto":"wbeimar Hincapie Castro","estado":"Activo","empresa":"00000"}
      
      ]
      
    for (let index = 400; index < 540; index++) {
      let cliente:Cliente=clientes[index]
      let id = cliente.Id
      this.Firebase.setCliente(`${id}-${cliente.empresa}`!, cliente).then(res=>{
        console.log("Cliente registrado")
      }).catch(error=>{
        console.log(error)
      })
      
    }
      
    
  }
}
