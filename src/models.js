const {validator} = require('indicative')
const edge = require('edge.js')

class Action {

    version;
    _schema;
    _tpl;

    constructor({version, schema, tpl}) {
        this.version = version
        this._schema = new Schema(schema)
        this._tpl = tpl.map(tp => new Tpl(tp))
    }

    get schema() {
        return this._schema.schema
    }

    async parse(data) {
        await this._schema.validate(data)
        return this._tpl.map(tpl => ({content: tpl.parse(data)})).filter(e => !!e.content)
    }
}

class Schema {

    schema;
    validations;

    constructor(schema) {
        this.schema = schema;
        if (schema && schema.length)
            this.validations = schema.reduce((acc, v) => Object.defineProperty(acc, v.name, {value: v.rule}), {})
    }

    async validate(data) {
        await validator.validate(data, this.validations)
    }
}

class Tpl {

    template;
    type;

    constructor({template, type}) {
        this.template = template
        this.type = type
    }

    parse(data) {
        try {
            if (this.template && this.template.length) {
                return edge.renderString(this.template, data)
            }
        } catch (e) {
        }
        return null
    }

}

module.exports = {
    Action, Tpl, Schema
}
