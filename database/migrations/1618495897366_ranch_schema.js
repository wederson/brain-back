'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RanchSchema extends Schema {
  up () {
    this.create('ranches', (table) => {
      table.increments()
      table
        .integer('agriculturist_id')
        .unsigned()
        .references('id')
        .inTable('agriculturists')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string("name").notNullable()
      table.string("city").notNullable()
      table.string("state").notNullable()
      table.float("total_area").notNullable()
      table.float("total_arable_area").notNullable()
      table.float("total_vegetation_area").notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('ranches')
  }
}

module.exports = RanchSchema
