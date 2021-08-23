import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import api from '../../services/api';
import eventBus from '../Components/EventBus'
import history from '../../history';

import Beneficios from '../Components/Beneficios';
import Header from '../Components/Header';
import PassagensTable from '../Components/PassagensTable';

import idaIcon from '../../assets/rightArrowCircleIcon.png'
import NavBack from '../../assets/arrowIcon.png';

let origem = null;
let destino = null;
let data = null;

export default function Passagens() {

    const [items, setItems] = useState([])

    const location = useLocation();

    useEffect(() => {
        try {
            if (!location.state.origem) {
                history.push('/home');
            }

            origem = location.state.origem;
            destino = location.state.destino;
            data = location.state.data;

            let dados = {
                origem,
                destino,
                data
            }
            if(items.length < 1){
                try {
                    api.post('/viagemfilter', dados).then(response => {
                        setItems(response.data);
                        console.log(response.data);
                    });
                } catch (error) {
                    alert('Erro ao buscar passagens de ida, tente novamente! ');
                }
            }
        } catch (error) {
            alert('Erro ao buscar passagens de volta, tente novamente! ');
        }
    }, [eventBus.dispatch("data", items)]);

    return (
        <div>
            <Header />
            <section style={{ marginLeft: '50px', paddingTop: '50px', display: "flex", alignItems: "center", justifyContent: 'start' }}>
                <Link to="/home">
                    <img src={NavBack} alt="Back" style={{ width: '64px', marginRight: '40px' }} />
                </Link>
                <h1 className="criarcontatitle">Passagens: </h1>
            </section>
            <div className="passagemSection">
                <section style={{ backgroundColor: "#0f173d", padding: "15px", display: "flex", alignItems: "center", justifyItems: "flex-center" }}>
                    <label style={{ fontFamily: "Arial", color: "#fff", fontSize: "22px" }}>Viagens Disponíveis - {origem} x {destino}</label>
                </section>
                <section style={{ margin: "50px", display: "flex", alignItems: "center" }}>
                    <img src={idaIcon} alt="Ida" style={{ width: '48px', marginRight: "20px", paddingBottom: "10px" }} />
                    <label style={{ fontFamily: "Arial", color: "#222", fontSize: "32px" }}>
                        Passagens - {data}
                    </label>
                </section>
                <div style={{ padding: "20px", margin: "20px" }}>
                    <PassagensTable items={items} />
                </div>
                <Beneficios />
            </div>
        </div>
    );
}