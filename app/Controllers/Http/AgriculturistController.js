'use strict'

const Agriculturist = use('App/Models/Agriculturist')

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

    if (data.ranch_total_arable_area + data.ranch_total_vegetation_area > data.ranch_total_area) {
      response.status(400).send({ 'message': "The total area must be greater than the sum of the planted area and the vegetation area"})
    }
    const agriculturist = await Agriculturist.create({ ...agriculturistData})

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
}

module.exports = AgriculturistController
