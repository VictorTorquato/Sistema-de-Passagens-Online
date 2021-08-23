const connection = require('../connection');
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = "any_secret_you_want_to_use";

module.exports = {

    async create(request, response){
        const {cpf, nome, email, senha} = request.body;

        try{
            await connection('usuario').insert({
                cpf,
                nome,
                email,
                senha
            }).returning('id').then( async function (id) {
                return response.json(id);
            });
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }    
    },

    async index(request, response){

        try{
            const data = await connection('usuario')
            .select('id','cpf', 'nome', 'email', 'passagens');

            return response.json(data);
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        } 
    },

    async get(request, response){
	    const { id } = request.params;

        try{
        
            const [data] = await connection('usuario')
            .where('id', '=', id)
            .select('id','cpf', 'nome', 'email', 'passagens');

            if(data === undefined)
                return response.status(404).send();
            else
                return response.json(data);
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },

    async delete(request, response){
	    const { id } = request.params;
	
	    try{
		    await connection('usuario')
		    .where('id', '=', id)
		    .delete();
	        return response.status(204).send();
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },

    async update(request, response){

        const { newCpf, newNome, newEmail, newSenha, id } = request.body;

        try{
            await connection('usuario').where('id', '=', id).update({
                cpf: newCpf,
                nome: newNome,
                email: newEmail,
                senha: newSenha
            });
	        return response.status(204).send();
        }
        catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    }

}