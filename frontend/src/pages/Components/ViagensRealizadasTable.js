import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import img from '../../assets/image-gallery.png'

const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
});

function createData(empresa, origem, destino, data, hora, onibus, valor) {
    return { empresa, origem, destino, data, hora, onibus, valor };
}

const rows = [
    createData('Viação Exemplo 1', 'Cidade 1', 'Cidade 2', "29/04/2021", "18:00", "Convencional", 24),
    createData('Viação Exemplo 2', 'Cidade 2', 'Cidade 3', "29/04/2021", "18:00", "Convencional", 37),
    createData('Viação Exemplo 3', 'Cidade 3', 'Cidade 4', "29/04/2021", "18:00", "Convencional", 24),
    createData('Viação Exemplo 4', 'Cidade 4', 'Cidade 5', "29/04/2021", "18:00", "Convencional", 67),
    createData('Viação Exemplo 5', 'Cidade 5', 'Cidade 6', "29/04/2021", "18:00", "Convencional", 49),
];

export default function DenseTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="medium" aria-label="a dense table">
                <TableHead style={{ borderBottom: "3px solid rgb(0, 0, 0)" }}>
                    <TableRow>
                        <TableCell align="center">Empresa</TableCell>
                        <TableCell align="center">Rota</TableCell>
                        <TableCell align="center">Data & Hora / Ônibus</TableCell>
                        <TableCell align="center">Valor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.empresa}>
                            <TableCell component="th" scope="row">
                                <img src={img} alt="Logo" style={{ width: '64px', marginRight: '30px'}} />
                                {row.empresa}
                            </TableCell>
                            <TableCell align="center">
                                {"De " + row.origem} <br/>
                                {"Para " + row.destino}
                            </TableCell>
                            <TableCell align="center">
                                {row.data + " - " + row.hora + "horas"}<br/>
                                {row.onibus}
                                </TableCell>
                            <TableCell align="center">
                                {row.valor}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}