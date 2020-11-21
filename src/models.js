
const {validator} = require('indicative')

class Action {

    version;
    schema;
    tpl;

    constructor({version, schema, tpl}) {
        this.version = version
        this.schema = schema
        this.tpl = tpl.map(tp => {
            switch (tp.type) {
                case 'file':
                    return new FileTpl(tp)
                case 'snippet':
                    return new SnippetTpl(tp)
            }
        })
    }

    async parse(data) {
        await validator.validate(data, this.schema)
        this.tpl
    }
}

class FileTpl {

}

class SnippetTpl {

}

module.exports = {
    Action, FileTpl, SnippetTpl
}
