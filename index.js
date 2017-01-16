const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const restify = require('express-restify-mongoose')
const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(methodOverride())

const schemas = require('./mongoose')

for (let i in schemas) {
    restify.serve(router, schemas[i], {lean: false})
}

app.use(router)

app.listen(3001, () => {
    console.log('Express server listening on port 3000')
})

