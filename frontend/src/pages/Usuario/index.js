import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import api from '../../services/api';

import NavBack from '../../assets/arrowIcon.png';
import EditIcon from '../../assets/editIcon.png'

import Header from '../Components/Header';
import ViagensRealizadas from '../Components/ViagensRealizadasTable';

import './styles.css';

export default function Usuario() {

    let userId = localStorage.getItem('userId');

    const [userData, setUserData] = useState()
    const [id, setId] = useState(userId);
    const [newCpf, setNewCpf] = useState(null);
    const [newNome, setNewNome] = useState(null);
    const [newEmail, setNewEmail] = useState(null);
    const [newSenha, setNewSenha] = useState('');
    const [editControl, setEditControl] = useState(false)

    const state = {
        Nome: "Carregando ...",
        CPF: "Carregando ...",
        Email: "Carregando ...",
    }

    console.log(userId);

    if (!userId) {
        alert("Erro ! Faça Login !")
        history.push('/home');
    }

    useEffect(() => {
        try {
            api.get('/usuario/' + userId).then(response => {
                setUserData(response.data);
                console.log(response.data);
            });
        } catch (error) {
            alert('Erro ao buscar usuario, tente novamente! ');
        }
    }, []);

    function onEdit() {
        if (editControl == false) {
            setEditControl(true);
            setNewNome(userData.nome);
            setNewCpf(userData.cpf);
            setNewEmail(userData.email);
        } else {
            setEditControl(false);
        }
    }

    function handleEdit() {
        let dadosPut = {
            id,
            newCpf,
            newNome,
            newEmail,
            newSenha
        }
        try {
            api.put('/usuario', dadosPut).then(response => {
                if(response.status == 200){
                    alert("Dados Atualizados!")
                }
                else{
                    alert("Erro ao editar dados!")
                }
                editControl = false;
            });
        } catch (error) {
            alert('Erro ao buscar passagens de ida, tente novamente! ');
        }
    }

    let dados;

    if (editControl == true) {
        dados = <form>
            <div style={{ padding: "5px", margin: "-23px", display: "flex", alignItems: "center", justifyContent: 'space-between', borderStyle: "solid" }}>
                <label style={{ marginLeft: "20px", marginTop: "5px", fontFamily: "Arial", fontSize: 24 }}>Editar Dados Pessoais </label>
                <img src={EditIcon} alt="Back" style={{ marginRight: "20px", width: '32px' }} onClick={onEdit}/>
            </div>
            <div style={{ margin: "5px", marginTop: "60px", marginLeft: "50px", display: "flex" }}>
                <label className="campos">Nome:</label>
                <input style={{ height: "30px", marginLeft: "15px" }} defaultValue={userData != null ? userData.nome : state.Nome} value={newNome} onChange={e => setNewNome(e.target.value)}/>
            </div>
            <div style={{ margin: "5px", marginLeft: "50px", display: "flex" }}>
                <label className="campos">CPF:</label>
                <input style={{ height: "30px", marginLeft: "25px" }} defaultValue={userData != null ? userData.cpf : state.CPF} value={newCpf} onChange={e => setNewCpf(e.target.value)}/>
            </div>
            <div style={{ margin: "5px", marginLeft: "50px", display: "flex" }}>
                <label className="campos">Email:</label>
                <input style={{ height: "30px", marginLeft: "15px" }} defaultValue={userData != null ? userData.email : state.Email} value={newEmail} onChange={e => setNewEmail(e.target.value)}/>
            </div>
            <div style={{ margin: "5px", marginLeft: "50px", display: "flex" }}>
                <label className="campos">Senha:</label>
                <input style={{ height: "30px", marginLeft: "15px", webkitTextSecurity: "disc" }} value={newSenha} onChange={e => setNewSenha(e.target.value)}/>
            </div>
            <div style={{ margin: "5px", marginTop: "20px", marginLeft: "50px", display: "flex" }}>
                <button className="buttonRed" type="submit" onClick={handleEdit}>Editar Dados</button>
            </div>
        </form >
    } else {
        dados = <form>
            <div style={{ padding: "5px", margin: "-23px", display: "flex", alignItems: "center", justifyContent: 'space-between', borderStyle: "solid" }}>
                <label style={{ marginLeft: "20px", marginTop: "5px", fontFamily: "Arial", fontSize: 24 }}>Dados Pessoais </label>
                <img src={EditIcon} alt="Back" style={{ marginRight: "20px", width: '32px' }} onClick={onEdit}/>
            </div>
            <div style={{ margin: "5px", marginTop: "60px", marginLeft: "50px", display: "flex" }}>
                <label className="campos">Nome:</label>
                <label style={{ marginLeft: "15px" }}>{userData != null ? userData.nome : state.Nome}</label>
            </div>
            <div style={{ margin: "5px", marginLeft: "50px", display: "flex" }}>
                <label className="campos">CPF:</label>
                <label style={{ marginLeft: "25px" }}>{userData != null ? userData.cpf : state.CPF}</label>
            </div>
            <div style={{ margin: "5px", marginLeft: "50px", display: "flex" }}>
                <label className="campos">Email:</label>
                <label style={{ marginLeft: "15px" }}>{userData != null ? userData.email : state.Email}</label>
            </div>
        </form>
    }

    return (

        <div>
            <Header />
            <section style={{ marginLeft: '50px', paddingTop: '50px', display: "flex", alignItems: "center", justifyContent: 'start' }}>
                <Link to="/home">
                    <img src={NavBack} alt="Back" style={{ width: '64px', marginRight: '40px' }} />
                </Link>
                <h1 className="criarcontatitle">Área do usuário: </h1>
            </section>
            <section style={{ padding: "20px", marginLeft: '100px', marginRight: '100px', marginTop: '50px', marginBottom: '50px', borderStyle: "solid" }}>
                {dados}
            </section>
            <section style={{ marginLeft: '50px', paddingTop: '20px', display: "flex", alignItems: "center", justifyContent: 'start' }}>
                <h1 className="criarcontatitle">Viagens Realizadas: </h1>
            </section>
            <div style={{ marginLeft: '100px', marginRight: '100px', marginTop: '50px', marginBottom: '50px', borderStyle: "solid" }}>
                <ViagensRealizadas />
            </div>
        </div>
    );
}

