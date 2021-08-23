import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import api from '../../services/api';

import NavBack from '../../assets/arrowIcon.png';
import recaptcha from '../../assets/captcha.png';

import Header from '../Components/Header'

import './styles.css';

export default function Login() {
    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleLogin(e){
        e.preventDefault();

        const data = {
            email,
            senha
        }

        try {
            const response = await api.post('/session', data);

            if (response.data.type == 'user'){
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('userName', response.data.nome);
            }
            else if (response.data.type == 'company'){
                localStorage.setItem('companyId', response.data.id);
                localStorage.setItem('companyName', response.data.nome);
            }
            if (response.data.id !== null || response.data.id !== undefined) {
                alert("Login realizado com sucesso! ");
                history.push('/home');
            }
        } catch (error) {
            alert('Erro no login, tente novamente! ');
        }

    }

    return(
        <div>
            <Header/>
            <section style={{marginLeft: '50px', paddingTop: '50px', display: "flex", alignItems: "center", justifyContent: 'start'}}>
                <Link to="/home">
                    <img src={NavBack} alt="Back" style={{ width: '64px', marginRight: '40px' }} />
                </Link>
                <h1 className="criarcontatitle">Entrar no sistema: </h1>
            </section>
            <section style={{padding: "20px", marginLeft: '100px', marginRight: '100px', marginTop: '50px', marginBottom: '50px', borderStyle: "solid",  display: "flex", alignItems: "center", justifyContent: 'space-around' }}>
                <form onSubmit={handleLogin} style={{width: "480px", margin: "15px", display: "flex", flexDirection: "column"}}>
                    
                        <label className="campos">Email:</label>
                        <input 
                            className="Input"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                        
                        <label className="campos">Senha:</label>
                        <input 
                            className="inputPass"
                            value={senha}
                            onChange={e => setSenha(e.target.value)} />
                        
                       <button className="buttonOrange" type="submit">Entrar</button>
                       
                </form>

                <img src={recaptcha} alt="I'm not a robot" style={{ width: '350px' }} />
            </section>
        </div>
    );
}