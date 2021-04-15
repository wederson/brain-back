'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CropsPlantedSchema extends Schema {
  up () {
    this.create('crops_planteds', (table) => {
      table.increments()
      table
        .integer('ranch_id')
        .unsigned()
        .references('id')
        .inTable('ranches')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('crops_planteds')
  }
}

module.exports = CropsPlantedSchema
