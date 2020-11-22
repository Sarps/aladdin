const path = require('path')
const util = require('util')
const fs = require('fs')
const {Action} = require('../models')
let glob = require('glob')


glob = util.promisify(glob)

let actionMap = {};


module.exports = class ActionLoader {

    static load(name) {
        if (actionMap.hasOwnProperty(name)) return actionMap[name]
        const file = path.resolve('data', `${name.replace('.', '/')}.json`)
        const data = JSON.parse(fs.readFileSync(file, {encoding: 'utf-8'}))
        const action = new Action(data);
        actionMap[name] = action
        return action
    }

}
