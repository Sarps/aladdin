const express = require('express')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const routes = require('./src/routes')
require('dotenv').config()

const argv = yargs(hideBin(process.argv)).argv
const app = express()

app.use('/static', express.static('static'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)

app.listen(argv.port, () => console.log(`Listening on port ${argv.port}`))
