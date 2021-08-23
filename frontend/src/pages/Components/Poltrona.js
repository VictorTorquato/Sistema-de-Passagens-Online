import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css'

export default class Header extends Component {

    state = {
        selected: null,
        poltrona: null,
        width: 0,
        tam: 32,
    };

    handleLabelClick(e) {

        if(this.state.selected)
        {
            this.state.selected.style.backgroundColor = "#ffff";
        }
        
        e.target.style.backgroundColor = "#90ee90";
        this.state.selected = e.target;
        this.state.poltrona = this.state.selected.id;
    };

    render() {

        let content1 = [];
        let content2 = [];
        let content3 = [];
        let content4 = [];
        let i;

        this.state.width = 0;

        for(i = 0; i < this.state.tam; i++)
        {
            content1.push(<label id={i+1} className="poltrona" disabled="true" onClick={(e) => { this.handleLabelClick(e) }}>{i+1}</label>)
            i++;
            if (i >= this.state.tam) 
            {
                this.state.width = this.state.width + 38.7;
                break;
            };
            content2.push(<label id={i+1} className="poltrona" onClick={(e) => { this.handleLabelClick(e) }}>{i+1}</label>)
            i++;
            if (i >= this.state.tam) 
            {
                this.state.width = this.state.width + 38.7;
                break;
            };
            content3.push(<label id={i+1} className="poltrona" onClick={(e) => { this.handleLabelClick(e) }}>{i+1}</label>)
            i++;
            if (i >= this.state.tam) 
            {
                this.state.width = this.state.width + 38.7;
                break;
            };
            content4.push(<label id={i+1} className="poltrona" onClick={(e) => { this.handleLabelClick(e) }}>{i+1}</label>)
            this.state.width = this.state.width + 38.7;
        }

        return (
            <section style={{ margin: "50px", display: "flex", justifyItems: "center", flexDirection: "column"}}>
                <div style={{ display: "flex"}}>
                    {content4}
                </div>
                <div style={{ display: "flex"}}>
                    {content3}
                </div>
                <div style={{ display: "flex"}}>
                    <label style={{ margin: "5px", borderStyle: "solid", width: this.state.width, display: "flex", justifyContent: 'center' }}> Corredor </label>
                </div>
                <div style={{ display: "flex"}}>
                    {content2}
                </div>
                <div style={{ display: "flex"}}>
                    {content1}
                </div>
            </section>
        );
    }
}