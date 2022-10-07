import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { categoriasServicio } from '../servicios/categoriaServicio';
import { defaultCategorias } from '../config/config';

export class Categorias extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categorias: []
        };

        this.categoriasServicio = new categoriasServicio();
        this.noAppiConect = true
    }

    componentDidMount() {
        if (this.noAppiConect) {
            this.setState({ categorias: defaultCategorias })
        } else {
            this.categoriasServicio.obtenerCategorias.then(data => this.setState({ categorias: data }))
        }
    }

    render() {
        const dynamicColumns = this.state.categorias.map((col, i) => {
            console.log(col)
            return <Column key={col.idtbl_categoria} field={col.categoria} header={col.categoria} />;
        });

        return (
            <div>
                <h1>Categorias</h1>
                <div className="card">
                    <DataTable value={this.state.categorias}>
                        {dynamicColumns}
                    </DataTable>
                </div>
            </div>
        );
    }
}