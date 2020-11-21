const path = require('path')
const util = require('util')
const fs = require('fs')
const {Action} = require('../models')
let glob = require('glob')


glob = util.promisify(glob)

let actionMap = {};


module.exports = class ActionLoader {

    static async getInstance() {
        if (!map) await ActionLoader.__mapData()
        return new ActionLoader()
    }

    static async __mapData() {
        const dirs = await glob("**/*.json", {cwd: path.resolve('data')});
        actionMap = dirs.reduce((acc, dir) => {
            const key = dir.replace('/', '.').replace(/\.json$/, '')
            acc[key] = path.resolve('data', dir)
            return acc;
        }, {})
    }

    static load(name) {
        if (actionMap.hasOwnProperty(name)) return actionMap[name]
        const file = path.resolve('data', `${name.replace('.', '/')}.json`)
        console.log(file)
        const data = JSON.parse(fs.readFileSync(file, {encoding: 'utf-8'}))
        const action = new Action(data);
        actionMap[name] = action
        return action
    }

}
