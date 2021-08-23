const connection = require('../connection');

module.exports = {

    async create(request, response) {
        const {id, destino, origem, distancia, tempo, onibus } = request.body;

        try {
            await connection('rota').insert({
                id,
                destino,
                origem,
                distancia,
                tempo,
                onibus
            }).returning('id').then( async function (id) {
                
                return response.json({id: id});
                
            });
        } catch (error) {
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },

    async index(request, response) {
        try {
            const data = await connection('rota')
                .join({ origem: 'cidade' }, 'rota.origem', '=', 'origem.id')
                .join({ destino: 'cidade' }, 'rota.destino', '=', 'destino.id')
                .join('onibus', 'rota.onibus', '=', 'onibus.id')
                .select('rota.id', 'origem.nome as nomeOrigem', 'destino.nome as nomeDestino', 'rota.distancia', 'rota.tempo', 'onibus.tipo');
            return response.json(data);
        } catch (error) {
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },

    async get(request, response) {
        const { id } = request.params;

        try {

            const [data] = await connection('rota')
                .join({ origem: 'cidade' }, 'rota.origem', '=', 'origem.id')
                .join({ destino: 'cidade' }, 'rota.destino', '=', 'destino.id')
                .join('onibus', 'rota.onibus', '=', 'onibus.id')
                .select('rota.id', 'origem.nome as nomeOrigem', 'destino.nome as nomeDestino', 'rota.distancia', 'rota.tempo', 'onibus.tipo')
                .where('rota.id', '=', id);

            if(data === undefined)
                return response.status(404).send();
            else
                return response.json(data);
        } catch (error) {
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },

    async delete(request, response) {
        const { id } = request.params;

        try {
            await connection('rota')
                .where('id', '=', id)
                .delete();
            return response.status(204).send();
        } catch (error) {
            console.log(error.name + ":" + error.message);
            return response.status(400).send();;
        }
    },

    async update(request, response) {

        const { id, destino, origem, distancia, tempo, onibus } = request.body;

        try {
            await connection('viagem').where('id', '=', id).update({
                destino: destino,
                origem: origem,
                distancia: distancia,
                tempo: tempo,
                onibus: onibus
            });
            return response.status(204).send();
        }
        catch (error) {
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    }
}