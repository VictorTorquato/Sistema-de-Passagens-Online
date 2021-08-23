const connection = require('../connection');

module.exports = {

    async create(request, response){
        const { sigla, nome } = request.body;
    
            const query = "INSERT INTO cidade (sigla, nome) VALUES ('" + sigla + "', '" + nome + "') RETURNING id";
            
            const id = await connection.raw(query)
            .then((rows) => {
                return response.status(201).send();
            })
            .catch((error) => {
                console.log(error.name + ":" + error.message);
                return response.status(400).send();
            });
            
    },   

    async index(request, response){

        try{
            const data = await connection('cidade')
                .select('id', 'sigla', 'nome');
            return response.json(data);
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();;
        }
    },

    async get(request, response){
        const { id } = request.params;

        try{
            connection('cidade')
            .where('id', '=', id)
            .select('id', 'sigla', 'nome');
            return response.json(data);
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();;
        }
    },

    async delete(request, response){
	    const { id } = request.params;
	
	    try{
		    await connection('cidade')
		    .where('id', '=', id)
		    .delete();
	        return response.status(204).send();
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();;
        }
    },

    async update(request, response){

        const { id, sigla, nome } = request.body;

        try{
            await connection('cidade').where('id', '=', id).update({
                sigla: sigla,
                nome: nome 
            });
	        return response.status(204).send();
        }
        catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    }
}