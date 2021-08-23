const connection = require('../connection');

module.exports = {

    async create(request, response){
        const { passagens, rota, cadeirasDisponiveis, status, data, hora, valor} = request.body;

        const empresa = request.headers.authorization;

        try{
            await connection('viagem').insert({
                passagens,
                rota,
                cadeirasDisponiveis, 
                status,
                empresa,
                data,
                hora,
                valor
            })
            return response.status(201).send()
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }    
    },

    async index(request, response){
        try{
            const data = await connection('viagem')
                .join('empresa', 'viagem.empresa' , 'empresa.id')
                .join('rota', 'viagem.rota', 'rota.id')
                .join({ origem: 'cidade' }, 'rota.origem', 'origem.id')
                .join({ destino: 'cidade' }, 'rota.destino', 'destino.id')
                .join('onibus', 'rota.onibus', 'onibus.id')
                .select('viagem.id','viagem.passagens', 'origem.nome as origem', 'destino.nome as destino', 'viagem.cadeirasDisponiveis', 'viagem.status', 'viagem.data', 'viagem.hora', 'empresa.nome as empresa', 'empresa.logo as logo', 'onibus.tipo', 'viagem.valor').orderBy('data');

            return response.json(data);
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        } 
    },

    async filter(request, response){
        const { origem,
                destino,
                data } = request.body;
        try{
            const dados = await connection('viagem')
                .join('empresa', 'viagem.empresa', 'empresa.id')
                .join('rota', 'viagem.rota', 'rota.id')
                .join('onibus', 'rota.onibus', 'onibus.id')
                .join({ origem: 'cidade' }, 'rota.origem', 'origem.id')
                .join({ destino: 'cidade' }, 'rota.destino', 'destino.id')
                .where('origem.nome', '=', origem)
                .where('destino.nome', '=', destino)
                .where('viagem.data', '=', data)
                .select('viagem.id', 'onibus.tipo', 'viagem.cadeirasDisponiveis', 
                        'viagem.status', 'viagem.data', 'viagem.hora', 
                        'empresa.nome as empresa', 'empresa.logo', 'viagem.valor')
                        .orderBy('data');

            return response.json(dados);
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        } 
    },

    async get(request, response){
        
	    const { id } = request.params;

        try{
            const [data] = await connection('viagem')
                .join('empresa', 'viagem.empresa', 'empresa.id')
                .join('rota', 'viagem.rota', 'rota.id')
                .join('onibus', 'rota.onibus', 'onibus.id')
                .join({ origem: 'cidade' }, 'rota.origem', 'origem.id')
                .join({ destino: 'cidade' }, 'rota.destino', 'destino.id')
                .select('viagem.id','viagem.passagens', 'origem.nome as origem', 'destino.nome as destino', 'viagem.cadeirasDisponiveis', 'viagem.status', 'viagem.data', 'viagem.hora', 'empresa.nome as empresa', 'empresa.logo as logo', 'onibus.tipo', 'viagem.valor')
                .where('viagem.id', '=', id);

            if(data === undefined)
                return response.status(404).send();

            return response.json(data);
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        } 
    },

    async delete(request, response){
        const empresa = request.headers.authorization;
	    const { id } = request.params;
	
	    try{
		    await connection('viagem')
		    .where('id', '=', id)
            .where('empresa', '=', empresa)
		    .delete();

	        return response.status(204).send();
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },

    async update(request, response){
        
        const empresa = request.headers.authorization;

        const { id, newRota, newStatus, newData, newHora, newValor} = request.body;

        try{
            await connection('viagem').where('id', '=', id).where('empresa', '=', empresa).update({
                rota: newRota,
                status: newStatus,
                data: newData,
                hora: newHora,
                valor: newValor
            });
	        return response.status(204).send();
        }
        catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    }

}