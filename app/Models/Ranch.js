'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ranch extends Model {
    agriculturist () {
        return this.belongsTo('App/Models/Agriculturist')
    }
    
    cropsPlanted () {
        return this.hasMany('App/Models/CropsPlanted')
    }
}

module.exports = Ranch
