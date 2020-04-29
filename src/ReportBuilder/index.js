'use strict'

const wkhtmltopdf = require('wkhtmltopdf')
const defaultConfig = require('./config/default.js')
const View = use('View')
// const Functions

class ReportBuilder {

  /**
   * Creates an instance of ReportBuilder.
   * @param {*} Config
   * @memberof ReportBuilder
   */
  constructor(Config) {
    /**
     * Options to wkhtmltopdf
     * More Options: https://wkhtmltopdf.org/usage/wkhtmltopdf.txt
     *
     * @option pageSize: Set paper size to: A4, Letter, etc. (default A4)
     * @option orientation: Set orientation to Landscape or Portrait. (default Portrait)
     * @option footerRight: Right aligned footer text. (default 'Page: [page] from [topage]')
     *
     * @type {Object}
     * @public
     */
    this.options = Config.merge('reportbuilder', defaultConfig)
  }

  async streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
      let buffers = [];
      stream.on('error', reject);
      stream.on('data', (data) => buffers.push(data));
      stream.on('end', () => resolve(Buffer.concat(buffers)));
    });
  }

  async builder() {
    this.stream = await wkhtmltopdf(this.html, this.options)
    this.buffer = await this.streamToBuffer(this.stream)
  }

  /**
   * Load a view to Report Builder
   *
   * @param {*} _template - Load template from edge view
   * @param {*} _data - Data to render report
   * @memberof ReportBuilder
   */
  async loadView(_template, _data) {
    const html = await View.render(_template, _data)
    this.html = html
  }

  /**
   * Load an HTML to build
   *
   * @param {*} _html
   * @memberof ReportBuilder
   */
  async loadHTML(_html) {
    this.html = _html
  }

  /**
   * Return base64 of an PDF
   *
   * @returns
   * @memberof ReportBuilder
   */
  async outputBase64() {
    await this.builder()
    return this.buffer.toString('base64')
  }

  /**
   * Return a RAW data of a PDF
   *
   * @returns
   * @memberof ReportBuilder
   */
  async outputBuffer() {
    await this.builder()
    return this.buffer
  }

  /**
   * Output to File and return base64
   *
   * @param {*} _file - Path to save
   * @returns
   * @memberof ReportBuilder
   */
  async outputToFile(_file) {
    this.options.output = file
    await this.builder()
    return this.buffer.toString('base64')
  }
}

module.exports = ReportBuilder
