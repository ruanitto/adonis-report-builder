'use strict'

/**
 * Report Builder Provider
 *
*/

const { ServiceProvider } = require('@adonisjs/fold')

class ReportBuilder extends ServiceProvider {
  register() {
    this.app.singleton('Addons/ReportBuilder', (app) => {
      const Config = app.use('Adonis/Src/Config')
      const ReportBuilder = require('../src/ReportBuilder')
      
      return new ReportBuilder(Config)
    })

    this.app.alias('Addons/ReportBuilder', 'ReportBuilder')
  }
}

module.exports = ReportBuilder
