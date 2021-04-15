'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CropsPlanted extends Model {
    ranch () {
        return this.belongsTo('App/Models/Ranch')
    }
}

module.exports = CropsPlanted
