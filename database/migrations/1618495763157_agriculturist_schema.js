'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AgriculturistSchema extends Schema {
  up () {
    this.create('agriculturists', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('cpf').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('agriculturists')
  }
}

module.exports = AgriculturistSchema
