const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {


// CRIAR REGISTRO DE NOVA ONG
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    // atraves da DB connection, faz-se o INSERT na tabela ONGS
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return response.json({ id });
  },



  //LISTAR TODAS AS ONGS
  async index(request, response) {

    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  },


}