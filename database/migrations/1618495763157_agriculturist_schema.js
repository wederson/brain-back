'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AgriculturistSchema extends Schema {
  up () {
    this.create('agriculturists', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('cpf').notNullable()
      table.string("ranch_name").notNullable()
      table.string("ranch_city").notNullable()
      table.string("ranch_state").notNullable()
      table.float("ranch_total_area").notNullable()
      table.float("ranch_total_arable_area").notNullable()
      table.float("ranch_total_vegetation_area").notNullable()
      table.string("ranch_crops_planted").notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('agriculturists')
  }
}

module.exports = AgriculturistSchema
