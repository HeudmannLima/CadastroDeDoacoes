connection = require('../database/connection');

module.exports = {

  // LISTA OS CASOS DE UMA ONG ESPECIFICA (ONG_ID) 
  async index(request, response) {
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents').where({ ong_id }).select('*');

    return response.json(incident);
  },

}