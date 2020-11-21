const express = require('express')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const routes = require('./src/routes')

const argv = yargs(hideBin(process.argv)).argv
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)

const ActionLoader = require('./src/loaders/ActionLoader')

const action = ActionLoader.load('action1')
console.log(action)
console.log(ActionLoader.load('action1'))
console.log(ActionLoader.load('spring.endpoint'))


app.listen(argv.port, () => console.log(`Listening on port ${argv.port}`))
