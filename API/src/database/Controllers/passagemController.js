const connection = require('../connection');

module.exports = {

    async create(request, response){
        const {plataforma, rota, valor, cadeira, tipoOnibus, dataCompra, dataViagem, horaViagem, empresa} = request.body;

        const usuario = request.headers.authorization;

        try{
            await connection('passagem').insert({
                usuario,
                plataforma,
                rota,
                valor,
                cadeira,
                tipoOnibus,
                dataCompra,
                dataViagem,
                horaViagem,
                empresa
            })
            return response.status(201).send()
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }    
    },

    async index(request, response){
        try{
            const data = await connection('passagem')
            .leftJoin('empresa', 'passagem.empresa', 'empresa.id')
            .join('usuario', 'usuario.cpf', 'passagem.usuario')
            .join('rota', 'passagem.rota', 'rota.id')
            .join({ origem: 'cidade' }, 'rota.origem', 'origem.id')
            .join({ destino: 'cidade'}, 'rota.destino', 'destino.id')
            .select('passagem.id', 'usuario.cpf', 'empresa.nome', 'empresa.logo', 'passagem.plataforma', 'origem.nome as nomeOrigem', 'destino.nome as nomeDestino', 'origem.sigla as siglaOrigem', 'destino.sigla as siglaDestino', 'passagem.valor', 'passagem.cadeira', 'passagem.tipoOnibus', 'passagem.dataCompra',  'passagem.dataViagem', 'passagem.horaViagem').orderBy('dataViagem');

            return response.json(data);
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        } 
    },

    async get(request, response){
        const { id } = request.params;

        try{
            const data = await connection('passagem')
            .leftJoin('empresa', 'passagem.empresa', 'empresa.id')
            .join('usuario', 'usuario.cpf', 'passagem.usuario')
            .join('rota', 'passagem.rota', 'rota.id')
            .join({ origem: 'cidade' }, 'rota.origem', 'origem.id')
            .join({ destino: 'cidade'}, 'rota.destino', 'destino.id')
            .select('passagem.id', 'usuario.cpf', 'empresa.nome', 'empresa.logo', 'passagem.plataforma', 'origem.nome as nomeOrigem', 'destino.nome as nomeDestino', 'origem.sigla as siglaOrigem', 'destino.sigla as siglaDestino', 'passagem.valor', 'passagem.cadeira', 'passagem.tipoOnibus', 'passagem.dataCompra',  'passagem.dataViagem', 'passagem.horaViagem')
            .where('passagem.id', '=', id)
            .orderBy('dataViagem');

            return response.json(data);
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        } 
    },

    async delete(request, response){
	    const { id } = request.params;
	
	    try{
		    await connection('passagem')
		    .where('id', '=', id)
		    .delete();
	        return response.status(204).send();
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },

    async update(request, response){

        const {id, newUsuario, newPlataforma, newRota, newValor, newCadeira, newTipoOnibus, newDataCompra, newDataViagem, newHoraViagem} = request.body;

        try{
            await connection('passagem').where('id', '=', id).update({
                usuario: newUsuario,
                plataforma: newPlataforma,
                rota: newRota,
                valor: newValor,
                cadeira: newCadeira,
                tipoOnibus: newTipoOnibus,
                dataCompra: newDataCompra,
                dataViagem: newDataViagem,
                horaViagem: newHoraViagem
            });
	        return response.status(204).send();
        }
        catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    }

}