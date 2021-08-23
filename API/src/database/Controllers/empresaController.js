const connection = require('../connection');
const onibus = require('./onibusController');
const viagem = require('./viagemController');

module.exports = {

    async create(request, response) {
        const { nome, email, telefone, cnpj, logo, senha } = request.body;

        try {
            await connection('empresa').insert({
                nome,
                email,
                telefone,
                cnpj,
                logo,
                senha
            }).returning('id').then(async function (id) {

            });
            return response.status(201).send();
        } catch (error) {
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },

    async index(request, response) {
        try {
            const data = await connection('empresa')
                .select('id', 'nome', 'email', 'telefone', 'cnpj', 'logo');
            return response.json(data);
        } catch (error) {
            console.log(error.name + ":" + error.message);
            return response.status(400).send();;
        }
    },

    async indexNoImage(request, response) {
        try {
            const data = await connection('empresa')
                .select('id', 'nome', 'email', 'telefone', 'cnpj', 'senha');
            return response.json(data);
        } catch (error) {
            console.log(error.name + ":" + error.message);
            return response.status(400).send();;
        }
    },

    async get(request, response){
	    const { id } = request.params;

        try{
            const [data] = await connection('empresa')
            .where('id', '=', id)
            .select('id', 'nome', 'email', 'telefone', 'cnpj', 'logo');

            if(data === undefined)
                return response.status(404).send();
            else
                return response.json(data);
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },

    async delete(request, response) {
        const { id } = request.params;

        try {

            const [onibusData] = await connection('empresa')
                .where('id', '=', id)
                .select('onibus');

            const [viagemData] = await connection('viagem')
                .where('empresa', '=', id)
                .select('id');
            
            if (onibusData.onibus !== null) {
                await connection('onibus')
                    .whereIn('id', onibusData.onibus)
                    .delete();
            }

            if (viagemData !== undefined) {
                await connection('viagem')
		            .whereIn('id', viagemData)
		            .delete();
            }

            await connection('empresa')
                .where('id', '=', id)
                .delete();

            return response.status(204).send();
        } catch (error) {
            console.log(error.name + ":" + error.message);
            return response.status(400).send();;
        }
    },

    async update(request, response) {

        const { id, nome, email, telefone, cnpj, logo, senha } = request.body;

        try {
            await connection('empresa').where('id', '=', id).update({
                nome: nome,
                email: email,
                telefone: telefone,
                cnpj: cnpj,
                logo: logo,
                senha: senha
            });
            return response.status(204).send();
        }
        catch (error) {
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    }
}