import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import history from '../../history';
import api from '../../services/api';

import Header from '../Components/Header';
import Poltrona from '../Components/Poltrona';

import NavBack from '../../assets/arrowIcon.png';
import logo from '../../assets/image-gallery.png'
import pagamento from '../../assets/formaPagamento.jpg'

import './styles.css';

export default function Comprar() {

    const location = useLocation();

    const state = {
        id: 0,
        passagens: [],
        origem: "Carregando...",
        destino: "Carregando...",
        cadeirasDisponiveis: 32,
        status: "Carregando...",
        data: '00/00/0000',
        hora: "00:00",
        empresa: "Carregando...",
        logo: logo,
        tipo: "Carregando...",
        valor: "Carregando..."
    }

    const [item, setItem] = useState([])
    let id = null;

    useEffect(() => {
        id = location.state.id;
        try {
            api.get('/viagem/'+id).then(response => {
                setItem(response.data);
                if(!response.data){

                }
                console.log(response.data);
            });
        } catch (error) {
            alert('Erro ao buscar passagens de ida, tente novamente! ');
        }
    }, [location.state.id]);

    function adicionaZero(numero) {
        if (numero <= 9)
            return "0" + numero;
        else
            return numero;
    }

    function formatData(dataCrua){
        const data = new Date(dataCrua);
        return(adicionaZero(data.getDate().toString()) + "/" +
                adicionaZero((data.getMonth() + 1).toString()) + "/" +
                adicionaZero(data.getFullYear().toString()))
    }

    function navBack(){
        let yourData = {
            origem: item.origem,
            destino: item.destino,
            data: formatData(item.data)
        }
        history.push('/results', yourData);
    }

    return (
        <div>
            <Header />
            <section style={{ marginLeft: '50px', paddingTop: '50px', display: "flex", alignItems: "center", justifyContent: 'start' }}>
                <img src={NavBack} alt="Back" style={{ width: '64px', marginRight: '40px' }} onClick={navBack} />
                <h1 className="criarcontatitle">Comprar Passagem: </h1>
            </section>
            <section style={{ marginLeft: '100px', marginRight: '100px', marginTop: '50px', marginBottom: '50px', borderStyle: "solid" }}>
                <div style={{ padding: "20px", borderBottom: "solid" }}>
                    <label style={{ marginLeft: "20px", marginTop: "5px", fontFamily: "Arial", fontSize: 24 }}>Confira os dados </label>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-evenly' }}>
                        <section style={{ margin: '50px' }}>
                            <img src={logo} alt="Logo" style={{ width: '128px', marginBottom: '15px' }} />
                            <label className="campos">{item.empresa ? item.empresa : state.empresa}</label>
                        </section>
                        <div style={{ marginRight: '100px' }}>
                            <section style={{ display: "flex", align: "center", justifyItems: "center" }}>
                                <label className="campos">Data:  </label>
                                <label className="values">{item.data ? formatData(item.data) : state.data}</label>
                            </section>
                            <section style={{ display: "flex", align: "center", justifyItems: "center" }}>
                                <label className="campos">Hora:  </label>
                                <label className="values">{item.hora ? item.hora : state.hora}</label>
                            </section>
                            <section style={{ display: "flex", align: "center", justifyItems: "center" }}>
                                <label className="campos">Origem: </label>
                                <label className="values">{item.origem ? item.origem : state.origem}</label>
                            </section>
                            <section style={{ display: "flex", align: "center", justifyItems: "center" }}>
                                <label className="campos">Destino:  </label>
                                <label className="values">{item.destino ? item.destino : state.destino}</label>
                            </section>
                            <section style={{ display: "flex", align: "center", justifyItems: "center" }}>
                                <label className="campos">Onibus:  </label>
                                <label className="values">{item.tipo ? item.tipo : state.tipo}</label>
                            </section>
                            <section style={{ display: "flex", align: "center", justifyItems: "center" }}>
                                <label className="campos">Valor:  </label>
                                <label className="values">{item.valor ? item.valor : state.valor}</label>
                            </section>
                        </div>
                    </div>
                </div>
                <div style={{ padding: "20px", borderBottom: "solid" }}>
                    <label style={{ marginLeft: "20px", marginTop: "5px", fontFamily: "Arial", fontSize: 24 }}>Escolha a poltrona </label>
                    <section style={{ display: "flex", justifyContent: "center" }}>
                        <Poltrona />
                    </section>
                </div>
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", justifyItems: "flex-center" }}>
                    <label style={{ marginLeft: "20px", marginTop: "5px", fontFamily: "Arial", fontSize: 24 }}>Escolha a forma de pagamento </label>
                    <img src={pagamento} alt="Logo" style={{ margin: "100px", width: '800px', alignSelf: "center" }} />
                </div>
                <div style={{ padding: "20px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <button className="buttonBlue" type="submit" onClick={navBack} >Cancelar</button>
                    <button className="buttonOrange" type="submit">Comprar</button>
                </div>
            </section>
        </div>
    );
}