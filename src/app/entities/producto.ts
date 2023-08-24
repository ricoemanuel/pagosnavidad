export interface Producto {
    tipo: string;
    codigo: string;
    nombre: string;
    referenciaFabrica: string;
    grupoInventario: string;
    estado: string;
    impuestoCargo: string;
    descripcionLarga: string;
    esIncluido: string;
    inventariable: string;
    saldoCantidades: number;
    precioVenta1: number;
    empresa?:string
    precioFacturado?:number;
    precioDeCompra?:number;
    fechaActualizacion?:Date;
    fechaCreacion?:Date
}