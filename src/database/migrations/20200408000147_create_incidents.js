exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table) {
    table.increments(); // chave primaria auto-increment 1, 2, 3...
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    //relacionamento com a tabela ONG
    // a chave primaria ('id) da tabela ONG é uma string,
    // entao o relacionamento aqui tbm tem q ser string
    table.string('ong_id').notNullable();
    // chave estrangeira, que vai fazer o 'link/relação' entre os dados
    // da tabela ONG via pela chave primária 'id' da ONG com essa tabela incidents
    // CHAVE ESTRANGEIRA 'ong_id' REFERENCIA 'id' na TABELA 'ongs'
    table.foreign('ong_id').references('id').inTable('ongs');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
