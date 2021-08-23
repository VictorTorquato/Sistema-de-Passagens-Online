const connection = require('../connection');

module.exports = {

    async create(request, response) {
        const { email, senha } = request.body;

        try {
            const user = await connection('usuario')
                .where('email', '=', email)
                .where('senha', '=', senha)
                .select('id', 'nome')
                .first();

            if (!user) {
                try {
                    const company = await connection('empresa')
                        .where('email', '=', email)
                        .where('senha', '=', senha)
                        .select('id', 'nome')
                        .first();

                    const data = { nome: company.nome, id: company.id , type: 'company'}

                    if (!company){
                        return response.status(404).send();
                    }
                    else{
                        return response.json(data);
                    }
                } catch (error) {
                    console.log(error.name + ":" + error.message);
                    return response.status(400).send();
                }
            }
            else {
                const data = { nome: user.nome, id: user.id , type: 'user'}

                return response.json(data);
            }
        } catch (error) {
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }

    }

}