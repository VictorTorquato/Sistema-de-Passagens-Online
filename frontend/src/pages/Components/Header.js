import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';

import logoImg from '../../assets/logoWhite.png';
import usuarioImg from '../../assets/user white.png';

import './styles.css'

export default function Header() {

    let company = localStorage.getItem('companyId');
    let companyName = localStorage.getItem('companyName');
    let user = localStorage.getItem('userId');
    let userName = localStorage.getItem('userName');

    let hideLabel;
    let cliente;
    let logged;

    if (!company) {
        hideLabel = 1;
        if (!user) {
            logged = 0;
        } else {
            cliente = userName;
            logged = 1;
        }
    }
    else {
        logged = 1;
        hideLabel = 0;
        cliente = companyName;
    }

    function logOut(){
        localStorage.removeItem('companyId');
        localStorage.removeItem('companyName');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        history.push('/home');
    }

    if (!logged) {
        return (
            <header className="header">
                <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
                    <img src={logoImg} alt="Our Traveler Logo" style={{ margin: '5px', width: '72px' }} />
                    <h1 className="Title" style={{ marginLeft: '20px', color: '#fff' }}>Our Traveler</h1>
                </div>
                <div style={{ marginRight: '40px' }}>
                    <Link to="/home">
                        <label style={{ margin: '15px', color: '#fff' }}>Home</label>
                    </Link>
                </div>
            </header>
        )
    } else {
        return (
            <header className="header">
                <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
                    <img src={logoImg} alt="Our Traveler Logo" style={{ margin: '5px', width: '72px' }} />
                    <h1 className="Title" style={{ marginLeft: '20px', color: '#fff' }}>Our Traveler</h1>
                    <h2 hidden={hideLabel} style={{ padding: "15px", marginTop: "20px", fontFamily: 'Varela Round', fontSize: "20px", fontWeight: 700, color: "#ff9d42" }}> - Empresa </h2>
                </div>
                <div style={{ marginRight: '40px' }}>
                    <Link to="/home">
                        <label style={{ margin: '15px', color: '#fff' }}>Home</label>
                    </Link>
                    <Link to={hideLabel ? "/user" : "/company" }>
                        <label style={{ marginLeft: '15px', color: '#fff' }}>{cliente}</label>
                        <img src={usuarioImg} style={{ marginBottom: '5px', width: '32px' }} />
                    </Link>
                    <button className="buttonLogout" type="submit" onClick={logOut}>LogOut</button>
                </div>
            </header>
        )
    }
}