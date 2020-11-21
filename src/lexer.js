const Lexer = require('lex')

const indent = [0];

let row;
let col;
const lexer = new Lexer(c => console.log(c));

row = 1;
col = 1;

lexer
    .addRule(/^[\t ]*/gm, function (lexeme) {
        const indentation = lexeme.length;

        if (indentation > indent[0]) {
            indent.unshift(indentation);
            return "INDENT";
        }

        const tokens = [];

        while (indentation < indent[0]) {
            tokens.push("DEDENT");
            indent.shift();
        }

        if (tokens.length) return tokens;
    })
    .addRule(/\n/, function () {
        row++;
        col = 1;
    }, [])
    .addRule(/\w+/, (lexeme) => {
        return "WORD"
    })
    .addRule(/[a-f\d]+/i, function (lexeme) {
        return "HEX";
    })
    .addRule(/[0-9]+(?:\.[0-9]+)?\b/, function (lexeme) {
        console.log(lexeme)
        this.yytext = lexeme;
        return "NUMBER";
    })
    .addRule(/\s+/, function () {})
    .addRule(/$/, function () {
        return "EOF";
    });

lexer.setInput(`
const ama = 'banku'
    delete aba
undo delete
`)
let value;
while (value = lexer.lex()) {
    console.log(value)
}


