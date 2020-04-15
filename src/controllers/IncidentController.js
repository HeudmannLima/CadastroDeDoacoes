connection = require('../database/connection');

module.exports = {


  // CRIA NOVO CASO PRA ONG X (ONG_ID)
  async create(request, response) {
    const { title, description, value } = request.body;

    // no insomnia, em HEADERS tem q ter o campo 'authorization' com o valor do ID da ong
    const ong_id = request.headers.authorization;

    // id é o primeiro valor retornado do array ao fazer o insert
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    console.log(id);
    return response.json({ id });
  },


  //LISTAR TODOS OS CASOS CADASTRADOS DE TODAS AS ONGS
  async index(request, response) {

    // PAGINAÇÃO (page = 1), se ñ houver page, valor default retorna 1
    // query: localhost:3333/incidents?page=1
    const { page = 1 } = request.query;

    // Limite de 5 por página
    let limit_page = 5;

    const incidents = await connection('incidents')
      // por padrão ele vai retornar os dados apenas do 'INCIDENTS' (casos),
      // mas queremos que retorne além dos CASOS, TODOS os dados da ONG q está na tab 'ONGS'
      // JOIN vai JUNTAR aq tds dados da tab 'ONGS' onde o 'ong.id' for IGUAL ao 'ong_id' da tab 'incidents'
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')

      // limite por page = 5 (limit_page)
      // offset PULA X registros pra frente, ou seja,
      // p/ page=1 >> 1-1*5=0, offset 0 não pula nenhum, começa 0 + limit 5, mostra 5 primeiros
      // p/ page=2 >> 2-1*5=5, offset 5, pula 5 registros, começa do 6o, mostra os outros 5...
      // p/ page=3 >> 2-1*5=5, offset 5, pula 5 registros, começa do 6o, mostra os outros 5...
      .limit(limit_page).offset((page - 1) * limit_page)

      // seleciono o q eu quero da junção das 2 tabelas depois join (ongs + incidents)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

      // RETORNAR TOTAL REGISTROS pelo HEADER e ver PELO HEADER
      const [count] = await connection('incidents').count();
      response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },


  // LISTA CASO POR ID DO CASO ESPECIFICO
  async show(request, response) {
    const { id } = request.params;

    const incident = await connection('incidents').where({ ong_id: id });

    return response.json(incident);
  },


  // DELETA CASO POR ID
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first(); //retorna a 1a ocorrência, só haverá uma

    // se ong_id for DIFERENTE do ong_id do header (ong logada), erro.
    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operação não Permitida!' });
    }

    await connection('incidents').where('id', id).del();

    //204 dá o ok sem mandar nenhuma resposta
    return response.status(204).send();
  }

};