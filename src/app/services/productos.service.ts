import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdcutosIdx } from '../interfaces/productos-idx.interface';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {

    cargando = true;
    productos: ProdcutosIdx[] = [];
    productosFiltrados: ProdcutosIdx[] = [];
    
    constructor( private http: HttpClient) {
        this.cargarProductos();
    }
    
    
    private cargarProductos(){

        return new Promise( (resolve, reject) =>{
            this.http.get('https://angular-html-base-default-rtdb.firebaseio.com/productos_idx.json')
            .subscribe ( (resp: ProdcutosIdx[]) => {
                this.productos = resp;
                this.cargando = false;
                resolve("¡Éxito!");
            })
        });

    }

    getProducto( id: string){
        return this.http.get(`https://angular-html-base-default-rtdb.firebaseio.com/productos/${id}.json`);
    }

    buscarProducto( termino: string ){
        if( this.productos.length === 0){
            this.cargarProductos().then( ()=>{
                this.filtrarProductos( termino );
            });
        }else{
            this.filtrarProductos( termino );
        }
    }

    private filtrarProductos( termino: string ){
        this.productosFiltrados = [];
        termino = termino.toLocaleLowerCase();
        this.productos.forEach( prod =>{
            const tituloLower = prod.titulo.toLocaleLowerCase();
            if(prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0){
                this.productosFiltrados.push( prod );
            }
        });
    }
}