import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdcutosIdx } from '../interfaces/productos-idx.interface';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {

    cargando = true;
    productos: ProdcutosIdx[] = [];
    
    constructor( private http: HttpClient) {
        this.cargarProductos();
    }
    
    
    private cargarProductos(){
        this.http.get('https://angular-html-base-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe ( (resp: ProdcutosIdx[]) => {
            this.productos = resp;
            this.cargando = false;
        })
    }
}
