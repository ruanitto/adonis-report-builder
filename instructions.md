## Registering provider

Make sure to register the provider inside `start/app.js` file.

```js
const providers = [
  '@ruanitto/adonis-report-builder/providers/ReportBuilder'
]
```

That's all! Now you can use the provider by pulling it from IoC container

```js
const ReportBuilder = use('ReportBuilder')

// Load and render an view
await ReportBuilder.loadView('VIEW_FROM_RESOURCE_PATH', dataToRender)

// Load and render an HTML String
await ReportBuilder.loadHTML('<h1>Hello World!</h1>')

// Result in base64
const stringResult = await ReportBuilder.outputBase64()

// Result in buffer
const bufferResult = await ReportBuilder.outputBuffer()

// Output to file
await ReportBuilder.outputToFile('PATH_TO_SAVE')
```

## Config

The config file is saved as `config/reportbuilder.js`. Make sure to tweak it as per your needs.

## Env variables

The `ReportBuilder` provider relies on following Env variables.
For more details or options configurations see : https://wkhtmltopdf.org/usage/wkhtmltopdf.txt

```
REPORT_PAGE_SIZE =
REPORT_PAGE_ORIENTATION =
REPORT_FOOTER_FONT_SIZE =
REPORT_FOOTER_RIGHT = 
REPORT_FOOTER_LEFT = 
REPORT_MARGIN_BOTTOM = 
REPORT_MARGIN_LEFT = 
REPORT_MARGIN_RIGHT = 
REPORT_MARGIN_TOP = 
```
