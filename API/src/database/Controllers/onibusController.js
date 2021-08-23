const connection = require('../connection');

module.exports = {

    async create(request, response){
        const { tipo, imagem, numCadeiras, placa} = request.body;

        const idEmpresa = request.headers.authorization;

        let i = 0;
        let cadeirasDisponiveis = [];

        while(i < numCadeiras){
            cadeirasDisponiveis[i] = i+1;
            i++;
        }

        try{
            await connection('onibus').insert({
                cadeirasDisponiveis,
                tipo,
                imagem,
                numCadeiras,
                placa
            }).returning('id').then( async function (id) {
                await connection('empresa').where('id', idEmpresa).update({
                    onibus: connection.raw('array_cat(onibus, ?)', [id])
                });
            });
            return response.status(201).send();
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },

    async index(request, response){
        try{
            const data = await connection('onibus')
            .select('id', 'tipo', 'numCadeiras', 'cadeirasDisponiveis', 'imagem', 'placa');
            return response.json(data);
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },

    async get(request, response){
	    const idEmpresa = request.headers.authorization;

        try{
        
            const [onibusData] = await connection('empresa')
            .where('id', '=', idEmpresa)
            .select('onibus');

            if(onibusData === undefined)
                return response.status(404).send();

            const data = await connection('onibus')
            .select('id', 'tipo', 'numCadeiras', 'cadeirasDisponiveis', 'imagem', 'placa')
            .whereIn('id', onibusData.onibus);

            return response.json(data);
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },

    async delete(request, response){
	    const { id } = request.params;
	
	    try{
		    await connection('onibus')
		    .where('id', '=', id)
		    .delete();
	        return response.status(204).send();
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },

    async update(request, response){

        const { id, tipo, imagem, numCadeiras, placa} = request.body;
        
        let i = 0;
        let cadeirasDisponiveis = [];

        while(i < numCadeiras){
            cadeirasDisponiveis[i] = i+1;
            i++;
        }

        try{
            await connection('onibus').where('id', '=', id).update({
                cadeirasDisponiveis: cadeirasDisponiveis,
                tipo: tipo,
                imagem: imagem,
                numCadeiras: numCadeiras,
                placa: placa
            });
	        return response.status(204).send();
        }
        catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    }
}