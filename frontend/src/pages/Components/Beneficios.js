import React from 'react';

import './styles.css';

export default function beneficios() {
    return (
        <div>
            <section className="faixaLaranja">
                <div>
                    <label className="exo40" >
                        Benefícios em ser <br />nosso viajante
                    </label>
                </div>
            </section>
            <section>
                <div className="beneficios">
                    <section className="beneficiosFont">
                        <label>Agilidade <br /><br /> Você reserva sua viagem de forma instantânea, basta comprar sua passagem antes da hora desejada e aproveitar a viagem</label>
                    </section>
                    <section className="beneficiosFont">
                        <label>Segurança <br /><br /> Todas as empresas de ônibus cadastradas são devidamente verificadas, com o objetivo de evitar fraudes e ameaças à segurança na hora de partir para a estrada</label>
                    </section>
                    <section className="beneficiosFont">
                        <label>Conforto <br /><br /> Buscamos sempre o melhor conforto para os nossos viajantes, para isso contamos com diversos tipos de ônibus, basta realizar o filtro na hora da busca pela passagem</label>
                    </section>
                    <section className="beneficiosFont">
                        <label>Preço <br /><br /> Aqui você consegue comparar os preços de diversas viagens e escolher a que melhor lhe agrade pelo menor preço</label>
                    </section>
                </div>
            </section>
        </div>
    );
};