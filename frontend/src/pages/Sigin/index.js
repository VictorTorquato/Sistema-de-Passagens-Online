import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import history from '../../history';

import NavBack from '../../assets/arrowIcon.png';

import Header from '../Components/Header'

import './styles.css';

export default function Register() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConf, setSenhaConf] = useState('');

    async function handleRegister(e) {
        e.preventDefault();

        if (senha == senhaConf) {

            const data = {
                cpf,
                nome,
                email,
                senha
            }

            try {
                let id = await api.post('/usuario', data);

                if (id !== null) {
                    alert("Conta criada com sucesso, faça login! ");
                    history.push('/login');
                }
            } catch (error) {
                alert('Erro no cadastro, tente novamente! ')
            }

        } else {
            alert("Confirme a senha novamente");
        }
    }

    return (
        <div>
            <Header />
            <section style={{ marginLeft: '50px', paddingTop: '50px', display: "flex", alignItems: "center", justifyContent: 'start' }}>
                <Link to="/home">
                    <img src={NavBack} alt="Rota" style={{ width: '64px', marginRight: '40px' }} />
                </Link>
                <h1 className="criarcontatitle">Criar Conta: </h1>
            </section>
            <section style={{ padding: "20px", marginLeft: '100px', marginRight: '100px', marginTop: '50px', marginBottom: '50px', borderStyle: "solid" }}>
                <form onSubmit={handleRegister} style={{ margin: "15px", display: "flex", flexDirection: "column" }}>
                    <label style={{ padding: "20px", fontFamily: "Arial", fontSize: 20, display: "flex", alignItems: "flex-start" }}>Insira seus dados </label>

                    <label className="campos">Nome:</label>
                    <input
                        className="Input"
                        value={nome}
                        onChange={e => setNome(e.target.value)} />

                    <label className="campos">Email:</label>
                    <input
                        type="email"
                        className="Input"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />

                    <label className="campos">CPF:</label>
                    <input
                        className="Input"
                        value={cpf}
                        onChange={e => setCpf(e.target.value)} />

                    <label className="campos" type="password">Senha:</label>
                    <input
                        className="inputPass"
                        value={senha}
                        onChange={e => setSenha(e.target.value)} />

                    <label className="campos" type="password">Confirmar Senha:</label>
                    <input
                        className="inputPass"
                        value={senhaConf}
                        onChange={e => setSenhaConf(e.target.value)} />

                    <button className="buttonBlue" type="submit">Criar Conta</button>
                </form>
            </section>
        </div>
    );
}