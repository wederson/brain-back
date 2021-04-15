'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Agriculturist extends Model {
    ranches () {
        return this.hasMany('App/Models/Ranch')
    }
}

module.exports = Agriculturist
