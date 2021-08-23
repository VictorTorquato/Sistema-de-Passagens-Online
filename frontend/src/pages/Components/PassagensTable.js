import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import eventBus from './EventBus'
import history from '../../history';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import img from '../../assets/image-gallery.png'

export default class PassagensTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: props.items
        };
    }

    componentDidMount() {
        try {
            eventBus.on("data", (data) => {
                this.state.items = data
            });
            eventBus.remove("data");
        } catch (error) {
            alert('Erro ao buscar passagens de volta, tente novamente! ');
        }
    }

    comprarButton(id, status){
        let user = localStorage.getItem('userId');
        let userName = localStorage.getItem('userName');

        if (status == 'Disponivel' || status == 'Viagem Disponivel' && user && userName){
            return(<button  className="buttonComprar" type="submit" value={id} onClick={(e) => this.purchase(e)}>Comprar</button>)
        }
    }

    purchase(e) {
        let id = e.target.value;
        const row = this.state.items;
        let state = null;
        let i = 0;
        while (i < row.length) {
            if (row[i].id == id) {
                state = {
                    row: row[i]
                }
            }
            i++;
        }
        if(state != null){
            history.push({
                pathname: '/purchase/' + id,
                state: {id: id,
                        items: this.state.items}
            });
        }
        else{
            alert("Erro, tente novamente!");
        }
        
    }

    render() {
        let i = 0;
        const row = this.state.items;

        return (
            <TableContainer component={Paper}>
                <Table style={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                    <TableHead style={{ borderBottom: "3px solid rgb(0, 0, 0)" }}>
                        <TableRow>
                            <TableCell align="center">Empresa</TableCell>
                            <TableCell align="center">Disponibilidade</TableCell>
                            <TableCell align="center">Hora / Ônibus</TableCell>
                            <TableCell align="center">Valor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                    <img src={row.logo.data.length > 5 ? row.logo : img} alt="Logo" style={{ width: '64px', marginRight: '30px' }} />
                                    {row.empresa}
                                </TableCell>
                                <TableCell align="center" style={{}}>
                                    {row.cadeirasDisponiveis + " Cadeiras Disponíveis"} <br />
                                    {row.status}
                                </TableCell>
                                <TableCell align="center">
                                    {row.hora + "horas"}<br />
                                    {row.onibus}
                                </TableCell>
                                <TableCell align="center">
                                    {row.valor}
                                    {this.comprarButton(row.id, row.status)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}