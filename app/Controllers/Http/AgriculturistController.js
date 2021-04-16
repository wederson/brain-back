'use strict'

const Agriculturist = use('App/Models/Agriculturist')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with agriculturists
 */
class AgriculturistController {
  /**
   * Show a list of all agriculturists.
   * GET agriculturists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
      const agriculturists = Agriculturist.all()

      return agriculturists
  }

  /**
   * Create/save a new agriculturist.
   * POST agriculturists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only([
      "name",
      "cpf",
      "ranch_name",
      "ranch_city",
      "ranch_state",
      "ranch_total_area",
      "ranch_total_arable_area",
      "ranch_total_vegetation_area",
      "ranch_crops_planted"
    ])

    if (parseInt(data.ranch_total_arable_area) + parseInt(data.ranch_total_vegetation_area) > parseInt(data.ranch_total_area)) {
      response.status(400).send({ 'message': "The total area must be greater than the sum of the planted area and the vegetation area"})
    }
    const agriculturist = await Agriculturist.create({ ...data})

    return agriculturist
  }

  /**
   * Display a single agriculturist.
   * GET agriculturists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const agriculturist = await Agriculturist.findOrFail(params.id)

    return agriculturist
  }

  /**
   * Update agriculturist details.
   * PUT or PATCH agriculturists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const agriculturist = await Agriculturist.findOrFail(params.id)
    const data = request.only([
      "name",
      "cpf",
      "ranch_name",
      "ranch_city",
      "ranch_state",
      "ranch_total_area",
      "ranch_total_arable_area",
      "ranch_total_vegetation_area",
      "ranch_crops_planted"
    ])

    if (parseInt(data.ranch_total_arable_area) + parseInt(data.ranch_total_vegetation_area) > parseInt(data.ranch_total_area)) {
      response.status(400).send({ 'message': "The total area must be greater than the sum of the planted area and the vegetation area"})
    }
    
    agriculturist.merge(data)

    await agriculturist.save()
    return agriculturist
  }

  /**
   * Delete a agriculturist with id.
   * DELETE agriculturists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const agriculturist = await Agriculturist.findOrFail(params.id)

    await agriculturist.delete()
  }

  /**
   * Show total of Agriculturist by City.
   * GET agriculturists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getTotalByCity ({ request, response, view }) {

    const agriculturistCity = await Agriculturist
                                .query()
                                .select('ranch_city')
                                .select(Database.raw('COUNT(ranch_city) as count_ranch_city'))
                                .groupBy('ranch_city')
                                .fetch()

    return agriculturistCity
  }

  async populate ({ request, response }) {
    const dataRio = {
      "name": "Robozinho",
      "cpf": "11111111111",
      "ranch_name": "Rancho 1",
      "ranch_city": "Rio de Janeiro",
      "ranch_state": "Rio de Janeiro",
      "ranch_total_area": 10,
      "ranch_total_arable_area": 5,
      "ranch_total_vegetation_area": 5,
      "ranch_crops_planted": "Soja, Milho, Algodão, Café"
    }
    const dataSP = {
      "name": "Robozinho 2",
      "cpf": "11111111111",
      "ranch_name": "Rancho 1",
      "ranch_city": "São Paulo",
      "ranch_state": "São Paulo",
      "ranch_total_area": 8,
      "ranch_total_arable_area": 4,
      "ranch_total_vegetation_area": 4,
      "ranch_crops_planted": "Soja, Milho, Algodão, Café"
    }

    const dataRS = {
      "name": "Robozinho 2",
      "cpf": "11111111111",
      "ranch_name": "Rancho 1",
      "ranch_city": "Rio Grande do Sul",
      "ranch_state": "Rio Grande do Sul",
      "ranch_total_area": 6,
      "ranch_total_arable_area": 3,
      "ranch_total_vegetation_area": 3,
      "ranch_crops_planted": "Soja, Milho, Algodão, Café"
    }

    for (let i = 0; i <= 10; i++) {
      await Agriculturist.create({ ...dataRio})
      await Agriculturist.create({ ...dataSP})
      await Agriculturist.create({ ...dataRS})
    }

    response.status(200).send({ 'message': "Sucesso"})
  }
}

module.exports = AgriculturistController
