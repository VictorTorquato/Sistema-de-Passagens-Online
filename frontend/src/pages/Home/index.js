import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import history from '../../history';

import Qualidades from '../Components/Qualidades';
import Beneficios from '../Components/Beneficios';
import Header from '../Components/Header';

import busImg from '../../assets/bus.png';
import rotaImg from '../../assets/mapLocation.png';
import localImg from '../../assets/mapFlag.png';
import pointImg from '../../assets/iconLocal.png';

import "react-datepicker/dist/react-datepicker.css";
import './styles.css'

function Home() {

    const [origem, setOrigem] = useState('');
    const [destino, setDestino] = useState('');
    const [data, setData] = useState();

    let company = localStorage.getItem('companyId');
    let user = localStorage.getItem('userId');

    let hideLogin;

    if (!company && !user) {
        hideLogin = 0;
    } else {
        hideLogin = 1;
    }

    function adicionaZero(numero) {
        if (numero <= 9)
            return "0" + numero;
        else
            return numero;
    }

    function formatData(data){
        return(adicionaZero(data.getDate().toString()) + "/" +
                adicionaZero((data.getMonth() + 1).toString()) + "/" +
                adicionaZero(data.getFullYear().toString()))
    }

    async function handleSearch(e) {
        e.preventDefault();
        try {

            if (!data) {
                alert("Escolha uma data")
                return;
            } else {
                let formatedData = formatData(data);

                let yourData = {
                    origem: origem,
                    destino: destino,
                    data: formatedData
                }

                history.push({
                    pathname: '/results',
                    state: yourData
                });
            }


        } catch (error) {
            alert('Verifique os dados e tente novamente! ');
        }
    }

    return (
        <div>
            <Header />
            <div className="logonContainer">
                <section className="form">
                    <form>
                        <h1 className="hometitle">Our Traveler</h1>
                        <div hidden={hideLogin} style={{ marginTop: "50px" }}>
                            <div className="form">
                                <Link to="/register">
                                    <button className="buttonBlue" type="submit">Criar Conta</button>
                                </Link>
                                <Link to="/login">
                                    <button className="buttonOrange" type="submit">Entrar</button>
                                </Link>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <label>É uma empresa e quer oferecer viagens? </label>
                                <Link style={{ margin: '10px' }} to="/registerCompany">
                                    Clique Aqui
                                </Link>
                            </div>
                        </div>
                    </form>
                </section>
                <img src={busImg} alt="" style={{ margin: '40px', width: '430px' }} />
            </div>
            <Qualidades />
            <div className="passagemSection">
                <section style={{ backgroundColor: "#090e27", height: "50px" }} />
                <div>
                    <section style={{ marginTop: "20px", marginLeft: "50px", marginRight: "250px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <img src={rotaImg} alt="Rota" style={{ marginBottom: '5px', width: '80px' }} />
                        <h2 className="caracteristicasFont">Encontre a rota desejada e adquira já sua passagem</h2>
                    </section>
                </div>
                <section className="passagemfilter">
                    <div style={{ margin: "15px", display: "flex", flexDirection: "column" }}>
                        <label>Origem:</label>
                        <input
                            className="Input"
                            value={origem}
                            onChange={e => setOrigem(e.target.value)} />
                    </div>
                    <div style={{ margin: "15px", display: "flex", flexDirection: "column" }}>
                        <label>Destino:</label>
                        <input
                            className="Input"
                            value={destino}
                            onChange={e => setDestino(e.target.value)} />
                    </div>
                    <div style={{ margin: "15px", display: "flex", flexDirection: "column" }}>

                        <label>Data:</label>
                        <DatePicker
                            className="InputDate"
                            selected={data}
                            onChange={(date) => setData(date)}
                            dateFormat="dd/MM/yyyy" />

                    </div>
                    <div style={{ marginLeft: "20px", marginTop: "20px", paddingRight: "20px" }}>
                        <button className="buttonLightBlue" type="submit" onClick={handleSearch}>Buscar Passagens</button>
                    </div>
                </section>
                <section>
                    <div>
                        <section style={{ marginTop: "30px", marginLeft: "50px", marginRight: "550px", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                            <img src={localImg} alt="Rota" style={{ marginBottom: '5px', width: '80px' }} />
                            <h2 className="caracteristicasFont">Destinos mais procurados</h2>
                        </section>
                        <section style={{ marginBottom: "50px", display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "flex-center" }}>
                            <div style={{ marginTop: "50px" }}>
                                <img src={pointImg} alt="Rota" style={{ marginBottom: '5px', width: '56px' }} />
                                <label>São Paulo - SP</label>
                                <img src={pointImg} alt="Rota" style={{ marginLeft: "100px", marginBottom: '5px', width: '56px' }} />
                                <label>Rio de Janeiro - RJ</label>
                            </div>
                            <div style={{ marginBottom: "50px", display: "block", justifyContent: 'space-around' }}>
                                <img src={pointImg} alt="Rota" style={{ marginLeft: "-50px", marginBottom: '5px', width: '56px' }} />
                                <label>Belo Horizonte - MG</label>
                                <img src={pointImg} alt="Rota" style={{ marginLeft: "59px", marginBottom: '5px', width: '56px' }} />
                                <label>Brasília - DF</label>
                            </div>
                        </section>
                        <Beneficios />
                    </div>
                </section>
            </div>
        </div>
    );
}


export default Home;