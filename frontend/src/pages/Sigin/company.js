import React, { useState, Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import history from '../../history';

import NavBack from '../../assets/arrowIcon.png';

import Header from '../Components/Header';

import './styles.css';

export default class register extends Component {

    render() {

        function States() {
            const [file, setFile] = useState('');
            const [logo, setLogo] = useState('');
            const [nome, setNome] = useState('');
            const [email, setEmail] = useState('');
            const [telefone, setTelefone] = useState('');
            const [cnpj, setCnpj] = useState('');
            const [senha, setSenha] = useState('');
            const [senhaConf, setSenhaConf] = useState('');
        }

        async function fileSelectedHandler(event) {
            const fileData = event.target.files[0];

            var uploadedFile = new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (event) => {
                    resolve(event.target.result);
                };

                reader.onerror = (err) => {
                    reject(err);
                };

                reader.readAsBinaryString(fileData);
            }).then(function (value) {
                States.logo = btoa(value);
                var imageUrl = "data:image/png;base64," + btoa(value);
                document.querySelector("#image").src = imageUrl;
            });
        }

        async function HandleRegister(e) {

            e.preventDefault();

            const data = {
                nome: States.nome,
                email: States.email,
                telefone: States.telefone,
                cnpj: States.cnpj,
                logo: States.logo,
                senha: States.senha,
            }

            if (data.senha == data.senhaConf) {
                
                try {
                    let id = await api.post('/empresa', data);

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
                    <form onSubmit={HandleRegister} style={{ margin: "15px", display: "flex", flexDirection: "column" }}>
                        <label style={{ padding: "20px", fontFamily: "Arial", fontSize: 20, display: "flex", alignItems: "flex-start" }}>Insira os dados da empresa</label>

                        <label className="campos">Logo:</label>
                        <input
                            type="file"
                            onChange={(event) => fileSelectedHandler(event)}
                            accept="image/png, image/jpeg" />
                            
                        <img id="image" style={{ margin: "20px", width: "280px" }} />

                        <label className="campos">Nome:</label>
                        <input
                            className="Input"
                            onChange={e => States.nome = e.target.value} />

                        <label className="campos">Email:</label>
                        <input
                            type="email"
                            className="Input"
                            onChange={e => States.email = e.target.value} />

                        <label className="campos">CNPJ:</label>
                        <input
                            className="Input"
                            onChange={e => States.cnpj = e.target.value} />

                        <label className="campos">Telefone:</label>
                        <input
                            className="Input"
                            onChange={e => States.telefone = e.target.value} />

                        <label className="campos">Senha:</label>
                        <input
                            className="inputPass"
                            onChange={e => States.senha = e.target.value} />

                        <label className="campos">Confirmar Senha:</label>
                        <input
                            className="inputPass"
                            onChange={e => States.senhaConf = e.target.value} />

                        <button className="buttonBlue" type="submit">Criar Conta</button>

                    </form>
                </section>
            </div>
        )
    }
}