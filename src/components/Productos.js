import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { productosServicio } from '../servicios/productoServicios';

export class Productos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        };
        this.noAppiConect = true

        this.columns = [
            { field: 'code', header: 'Id' },
            { field: 'name', header: 'nombre' },
            { field: 'category', header: 'Categoria' },
            { field: 'quantity', header: 'Descripcion' },
            { field: 'quantity', header: 'Descripcion' }
        ];

        this.producotServicio = new productosServicio();
    }

    componentDidMount() {
        if (this.noAppiConect) {
            this.setState({ categorias: defaultCategorias })
        } else {
            this.categoriasServicio.obtenerCategorias.then(data => this.setState({ productos: data }))
        }
    }

    render() {
        const dynamicColumns = this.columns.map((col, i) => {
            return <Column key={col.field} field={col.field} header={col.header} />;
        });

        return (
            <div>
                <h1>Productos</h1>
                <div className="card">
                    <DataTable value={this.state.productos}>
                        {dynamicColumns}
                    </DataTable>
                </div>
            </div>
        );
    }
}