const connection = require('../database/connection');

module.exports = {

  // Cria uma sessão ao se Logar.
  // A verificação necessária é verificar se a Ong existe
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection('ongs')
      .where({ id })
      .select('name')
      .first(); // para retornar somente um valor, o NAME

    if (!ong) {
      return response.status(400).json({ error: 'No ONG found with this ID!'});
    }

    return response.json(ong);
  }

}